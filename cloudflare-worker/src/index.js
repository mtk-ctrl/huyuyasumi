const DEFAULT_ALLOWED_ORIGINS = [
  "https://mtk-ctrl.github.io",
  "https://htmlpreview.github.io"
];
const MAX_STATE_BYTES = 512 * 1024;

export default {
  async fetch(request, env) {
    const originCheck = getAllowedOrigin(request, env);
    if (originCheck.blocked) {
      return jsonResponse({ error: "許可されていない画面からのアクセスです。" }, 403, null);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(originCheck.origin)
      });
    }

    const url = new URL(request.url);
    if (url.pathname === "/api/health" && request.method === "GET") {
      return jsonResponse({ ok: true }, 200, originCheck.origin);
    }

    if (url.pathname !== "/api/state") {
      return jsonResponse({ error: "Not found" }, 404, originCheck.origin);
    }

    if (!env.DB) {
      return jsonResponse({ error: "D1データベースがWorkerへ接続されていません。" }, 503, originCheck.origin);
    }

    if (!env.FAMILY_ACCESS_KEY) {
      return jsonResponse({ error: "家族用キーがWorkerに設定されていません。" }, 503, originCheck.origin);
    }

    const accessKey = readBearerToken(request);
    if (!accessKey || !constantTimeEqual(accessKey, env.FAMILY_ACCESS_KEY)) {
      return jsonResponse({ error: "Unauthorized" }, 401, originCheck.origin);
    }

    try {
      if (request.method === "GET") {
        return await readState(env, originCheck.origin);
      }
      if (request.method === "PUT") {
        return await writeState(request, env, originCheck.origin);
      }
      return jsonResponse({ error: "Method not allowed" }, 405, originCheck.origin, {
        Allow: "GET, PUT, OPTIONS"
      });
    } catch (error) {
      console.error("lifequest worker error", error);
      return jsonResponse({ error: "クラウド保存中にエラーが発生しました。" }, 500, originCheck.origin);
    }
  }
};

function getAllowedOrigin(request, env) {
  const origin = request.headers.get("Origin");
  if (!origin) return { origin: null, blocked: false };

  const configuredOrigins = String(env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const allowedOrigins = configuredOrigins.length ? configuredOrigins : DEFAULT_ALLOWED_ORIGINS;

  return {
    origin: allowedOrigins.includes(origin) ? origin : null,
    blocked: !allowedOrigins.includes(origin)
  };
}

function corsHeaders(origin) {
  const headers = {
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin"
  };
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

function jsonResponse(payload, status, origin, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...corsHeaders(origin),
      ...extraHeaders
    }
  });
}

function readBearerToken(request) {
  const value = request.headers.get("Authorization") || "";
  const match = value.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : "";
}

function constantTimeEqual(left, right) {
  const leftBytes = new TextEncoder().encode(String(left));
  const rightBytes = new TextEncoder().encode(String(right));
  if (leftBytes.length !== rightBytes.length) return false;

  let difference = 0;
  for (let index = 0; index < leftBytes.length; index += 1) {
    difference |= leftBytes[index] ^ rightBytes[index];
  }
  return difference === 0;
}

async function readRow(env) {
  return env.DB.prepare(
    "SELECT state_json, client_updated_at, server_updated_at FROM family_state WHERE id = ?"
  )
    .bind("family")
    .first();
}

function rowPayload(row) {
  if (!row) return { state: null, updatedAt: 0, serverUpdatedAt: 0 };
  return {
    state: JSON.parse(row.state_json),
    updatedAt: Number(row.client_updated_at) || 0,
    serverUpdatedAt: Number(row.server_updated_at) || 0
  };
}

async function readState(env, origin) {
  const row = await readRow(env);
  return jsonResponse(rowPayload(row), 200, origin);
}

async function writeState(request, env, origin) {
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_STATE_BYTES) {
    return jsonResponse({ error: "保存データが大きすぎます。" }, 413, origin);
  }

  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    return jsonResponse({ error: "JSON形式が正しくありません。" }, 400, origin);
  }

  const updatedAt = Number(payload?.updatedAt);
  const state = payload?.state;
  if (!Number.isFinite(updatedAt) || updatedAt <= 0) {
    return jsonResponse({ error: "更新日時が正しくありません。" }, 400, origin);
  }
  if (!state || state.version !== 4 || typeof state.records !== "object" || Array.isArray(state.records)) {
    return jsonResponse({ error: "ライフクエストの保存データ形式が正しくありません。" }, 400, origin);
  }

  const stateJson = JSON.stringify(state);
  if (new TextEncoder().encode(stateJson).byteLength > MAX_STATE_BYTES) {
    return jsonResponse({ error: "保存データが大きすぎます。" }, 413, origin);
  }

  const serverUpdatedAt = Date.now();
  await env.DB.prepare(
    `INSERT INTO family_state (id, state_json, client_updated_at, server_updated_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       state_json = excluded.state_json,
       client_updated_at = excluded.client_updated_at,
       server_updated_at = excluded.server_updated_at
     WHERE excluded.client_updated_at >= family_state.client_updated_at`
  )
    .bind("family", stateJson, Math.trunc(updatedAt), serverUpdatedAt)
    .run();

  const row = await readRow(env);
  return jsonResponse(rowPayload(row), 200, origin);
}
