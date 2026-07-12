import worker from "./src/index.js";

class FakeStatement {
  constructor(database, sql) {
    this.database = database;
    this.sql = sql;
    this.args = [];
  }

  bind(...args) {
    this.args = args;
    return this;
  }

  async first() {
    return this.database.row;
  }

  async run() {
    const [, stateJson, clientUpdatedAt, serverUpdatedAt] = this.args;
    if (!this.database.row || clientUpdatedAt >= this.database.row.client_updated_at) {
      this.database.row = {
        state_json: stateJson,
        client_updated_at: clientUpdatedAt,
        server_updated_at: serverUpdatedAt
      };
    }
    return { success: true };
  }
}

class FakeDatabase {
  constructor() {
    this.row = null;
  }

  prepare(sql) {
    return new FakeStatement(this, sql);
  }
}

const environment = {
  DB: new FakeDatabase(),
  FAMILY_ACCESS_KEY: "secret",
  ALLOWED_ORIGINS: "https://mtk-ctrl.github.io"
};
const headers = {
  Origin: "https://mtk-ctrl.github.io",
  Authorization: "Bearer secret",
  "Content-Type": "application/json"
};

let response = await worker.fetch(new Request("https://worker.example/api/state", { headers }), environment);
let body = await response.json();
if (response.status !== 200 || body.state !== null) throw new Error("initial GET failed");

const state = { version: 4, memberId: "son", records: {} };
response = await worker.fetch(
  new Request("https://worker.example/api/state", {
    method: "PUT",
    headers,
    body: JSON.stringify({ state, updatedAt: 100 })
  }),
  environment
);
body = await response.json();
if (response.status !== 200 || body.updatedAt !== 100) throw new Error("PUT failed");

response = await worker.fetch(
  new Request("https://worker.example/api/state", {
    method: "PUT",
    headers,
    body: JSON.stringify({ state: { ...state, memberId: "eldest" }, updatedAt: 90 })
  }),
  environment
);
body = await response.json();
if (body.updatedAt !== 100 || body.state.memberId !== "son") throw new Error("stale write was accepted");

response = await worker.fetch(
  new Request("https://worker.example/api/state", {
    headers: { Origin: "https://mtk-ctrl.github.io", Authorization: "Bearer wrong" }
  }),
  environment
);
if (response.status !== 401) throw new Error("auth failed");

console.log("worker tests ok");
