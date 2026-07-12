(() => {
  "use strict";

  const APP_STORAGE_KEY = "huyuyasumi-lifequest-v4";
  const META_STORAGE_KEY = "huyuyasumi-lifequest-cloudflare-meta-v1";
  const ACCESS_KEY_STORAGE_KEY = "huyuyasumi-lifequest-family-key-v1";
  const RELOAD_MESSAGE_KEY = "huyuyasumi-lifequest-cloud-reload-message";
  const config = window.LIFEQUEST_CLOUD || {};
  const originalSetItem = Storage.prototype.setItem;
  const workerUrl = normalizeWorkerUrl(config.workerUrl);
  const configured = Boolean(workerUrl && !workerUrl.includes("YOUR_"));

  let syncTimer = null;
  let syncing = false;
  let suppressLocalChange = false;

  const ui = {
    root: null,
    status: null,
    keyInput: null,
    connectButton: null,
    syncButton: null,
    disconnectButton: null,
    message: null
  };

  function normalizeWorkerUrl(value) {
    if (!value) return "";
    return String(value).trim().replace(/\/+$/, "");
  }

  function safeJsonParse(value, fallback = null) {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  function loadMeta() {
    const stored = safeJsonParse(localStorage.getItem(META_STORAGE_KEY), {});
    return {
      localUpdatedAt: Number(stored?.localUpdatedAt) || 0,
      cloudUpdatedAt: Number(stored?.cloudUpdatedAt) || 0,
      pending: Boolean(stored?.pending),
      lastSyncedAt: Number(stored?.lastSyncedAt) || 0
    };
  }

  function saveMeta(meta) {
    originalSetItem.call(localStorage, META_STORAGE_KEY, JSON.stringify(meta));
  }

  function getLocalState() {
    const value = safeJsonParse(localStorage.getItem(APP_STORAGE_KEY));
    if (!value || value.version !== 4 || typeof value.records !== "object") return null;
    return value;
  }

  function getStoredAccessKey() {
    return localStorage.getItem(ACCESS_KEY_STORAGE_KEY) || "";
  }

  function setStoredAccessKey(value) {
    if (value) originalSetItem.call(localStorage, ACCESS_KEY_STORAGE_KEY, value);
    else localStorage.removeItem(ACCESS_KEY_STORAGE_KEY);
  }

  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .cloud-sync-card{max-width:860px;margin:0 auto 14px;padding:16px 18px;border-radius:24px;display:grid;gap:12px}
      .cloud-sync-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
      .cloud-sync-head h2{margin:0;font-size:18px}.cloud-sync-head p{margin:3px 0 0;color:var(--muted);font-size:11px;line-height:1.55}
      .cloud-sync-status{flex:0 0 auto;padding:7px 10px;border:1px solid var(--line);border-radius:999px;color:var(--muted);background:rgba(255,255,255,.05);font-size:10px;font-weight:800}
      .cloud-sync-status.online{color:#153b36;border-color:#a9ffe1;background:#a9ffe1}.cloud-sync-status.syncing{color:#34280c;border-color:#ffe29b;background:#ffe29b}.cloud-sync-status.error{color:#4a1720;border-color:#ffb2bf;background:#ffb2bf}
      .cloud-sync-controls{display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:8px}
      .cloud-sync-controls input{min-width:0;padding:12px 13px;border:1px solid var(--line);border-radius:14px;color:var(--ink);background:rgba(4,10,30,.48);outline:none}
      .cloud-sync-controls input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(130,244,255,.12)}
      .cloud-sync-controls button{min-height:44px;padding:9px 14px;border:1px solid var(--line);border-radius:14px;color:var(--ink);background:rgba(255,255,255,.08);font-weight:800;cursor:pointer}
      .cloud-sync-controls button.primary{color:#132341;border:0;background:linear-gradient(135deg,#a7f7ff,#bba9ff)}
      .cloud-sync-controls button:disabled{opacity:.55;cursor:wait}
      .cloud-sync-message{min-height:1.4em;margin:0;color:var(--muted);font-size:10px;line-height:1.45}
      .cloud-sync-message.error{color:#ffc0c9}.cloud-sync-message.success{color:var(--green)}
      @media(max-width:700px){.cloud-sync-head{align-items:flex-start}.cloud-sync-controls{grid-template-columns:1fr 1fr}.cloud-sync-controls input{grid-column:1/-1}.cloud-sync-controls button:last-child{grid-column:1/-1}}
    `;
    document.head.appendChild(style);
  }

  function buildUi() {
    injectStyles();
    const root = document.createElement("section");
    root.className = "cloud-sync-card glass";
    root.setAttribute("aria-label", "スマホとパソコンの同期");
    root.innerHTML = `
      <div class="cloud-sync-head">
        <div>
          <p class="eyebrow">FAMILY CLOUD</p>
          <h2>スマホ・PCで記録を共有</h2>
          <p>入力内容はまずこの端末に保存し、接続中だけ家族専用クラウドへ同期します。</p>
        </div>
        <span class="cloud-sync-status" data-role="status">端末内保存</span>
      </div>
      <div class="cloud-sync-controls">
        <input data-role="key" type="password" autocomplete="current-password" maxlength="120" placeholder="家族用キーを入力">
        <button class="primary" data-role="connect" type="button">接続する</button>
        <button data-role="sync" type="button">今すぐ同期</button>
        <button data-role="disconnect" type="button">この端末の接続を解除</button>
      </div>
      <p class="cloud-sync-message" data-role="message" aria-live="polite"></p>
    `;

    const familyDeck = document.querySelector(".family-deck");
    if (familyDeck) familyDeck.after(root);
    else document.querySelector(".sky")?.prepend(root);

    ui.root = root;
    ui.status = root.querySelector('[data-role="status"]');
    ui.keyInput = root.querySelector('[data-role="key"]');
    ui.connectButton = root.querySelector('[data-role="connect"]');
    ui.syncButton = root.querySelector('[data-role="sync"]');
    ui.disconnectButton = root.querySelector('[data-role="disconnect"]');
    ui.message = root.querySelector('[data-role="message"]');

    const storedKey = getStoredAccessKey();
    if (storedKey) ui.keyInput.value = storedKey;

    ui.connectButton.addEventListener("click", connect);
    ui.syncButton.addEventListener("click", () => syncNow({ interactive: true }));
    ui.disconnectButton.addEventListener("click", disconnect);
    ui.keyInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") connect();
    });

    refreshUi();
  }

  function setStatus(text, tone = "") {
    if (!ui.status) return;
    ui.status.textContent = text;
    ui.status.className = `cloud-sync-status${tone ? ` ${tone}` : ""}`;
  }

  function setMessage(text, tone = "") {
    if (!ui.message) return;
    ui.message.textContent = text;
    ui.message.className = `cloud-sync-message${tone ? ` ${tone}` : ""}`;
  }

  function setBusy(value) {
    [ui.connectButton, ui.syncButton, ui.disconnectButton].forEach((button) => {
      if (button) button.disabled = value;
    });
  }

  function refreshUi() {
    if (!ui.root) return;
    const hasKey = Boolean(getStoredAccessKey());
    ui.keyInput.hidden = hasKey;
    ui.connectButton.hidden = hasKey;
    ui.syncButton.hidden = !hasKey;
    ui.disconnectButton.hidden = !hasKey;

    if (!configured) {
      setStatus("クラウド設定待ち");
      setMessage("Worker URLを設定するまでは、端末内だけに安全に保存されます。");
      ui.keyInput.disabled = true;
      ui.connectButton.disabled = true;
      ui.syncButton.disabled = true;
      return;
    }

    ui.keyInput.disabled = false;
    if (!hasKey) {
      setStatus("端末内保存");
      setMessage("Cloudflareで設定した家族用キーを入力すると、この端末を同期できます。");
    } else {
      const meta = loadMeta();
      if (meta.pending) {
        setStatus("同期待ち", "syncing");
        setMessage("端末には保存済みです。通信できる時に自動で送信します。");
      } else if (meta.lastSyncedAt) {
        const time = new Intl.DateTimeFormat("ja-JP", { hour: "2-digit", minute: "2-digit" }).format(new Date(meta.lastSyncedAt));
        setStatus("接続済み", "online");
        setMessage(`最終同期：${time}`, "success");
      } else {
        setStatus("接続確認中", "syncing");
        setMessage("クラウドとの初回同期を行います。");
      }
    }
  }

  function authHeaders(accessKey, includeJson = false) {
    const headers = { Authorization: `Bearer ${accessKey}` };
    if (includeJson) headers["Content-Type"] = "application/json";
    return headers;
  }

  async function apiRequest(path, options = {}, accessKey = getStoredAccessKey()) {
    if (!configured) throw new Error("Worker URLが設定されていません。");
    if (!accessKey) throw new Error("家族用キーが入力されていません。");

    const response = await fetch(`${workerUrl}${path}`, {
      ...options,
      cache: "no-store",
      headers: {
        ...authHeaders(accessKey, Boolean(options.body)),
        ...(options.headers || {})
      }
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401) throw new Error("家族用キーが違います。");
      if (response.status === 403) throw new Error("この画面のURLはWorker側で許可されていません。");
      throw new Error(payload.error || `クラウド通信に失敗しました（${response.status}）。`);
    }
    return payload;
  }

  function markLocalChange() {
    if (suppressLocalChange) return;
    const meta = loadMeta();
    meta.localUpdatedAt = Date.now();
    meta.pending = true;
    saveMeta(meta);
    refreshUi();
    scheduleSync();
  }

  function scheduleSync() {
    clearTimeout(syncTimer);
    if (!configured || !getStoredAccessKey()) return;
    syncTimer = window.setTimeout(() => syncNow(), 900);
  }

  function applyRemoteState(remoteState, updatedAt) {
    suppressLocalChange = true;
    try {
      originalSetItem.call(localStorage, APP_STORAGE_KEY, JSON.stringify(remoteState));
      saveMeta({
        localUpdatedAt: updatedAt,
        cloudUpdatedAt: updatedAt,
        pending: false,
        lastSyncedAt: Date.now()
      });
      sessionStorage.setItem(RELOAD_MESSAGE_KEY, "別の端末の新しい記録を読み込みました。");
    } finally {
      suppressLocalChange = false;
    }
    location.reload();
  }

  async function pushLocalState(localState, meta, accessKey) {
    if (!meta.localUpdatedAt) meta.localUpdatedAt = Date.now();
    const result = await apiRequest(
      "/api/state",
      {
        method: "PUT",
        body: JSON.stringify({ state: localState, updatedAt: meta.localUpdatedAt })
      },
      accessKey
    );

    const cloudUpdatedAt = Number(result.updatedAt) || 0;
    if (result.state && cloudUpdatedAt > meta.localUpdatedAt) {
      applyRemoteState(result.state, cloudUpdatedAt);
      return { reloaded: true };
    }

    saveMeta({
      localUpdatedAt: Math.max(meta.localUpdatedAt, cloudUpdatedAt),
      cloudUpdatedAt,
      pending: false,
      lastSyncedAt: Date.now()
    });
    return { reloaded: false };
  }

  async function syncNow({ interactive = false, accessKey = getStoredAccessKey() } = {}) {
    if (syncing || !configured || !accessKey) return;
    syncing = true;
    setBusy(true);
    setStatus("同期中", "syncing");
    if (interactive) setMessage("スマホ・PCの最新記録を確認しています。");

    try {
      const localState = getLocalState();
      if (!localState) throw new Error("端末内の記録を読み込めませんでした。");

      const remote = await apiRequest("/api/state", { method: "GET" }, accessKey);
      const remoteUpdatedAt = Number(remote.updatedAt) || 0;
      const meta = loadMeta();

      if (remote.state && remoteUpdatedAt > meta.localUpdatedAt) {
        applyRemoteState(remote.state, remoteUpdatedAt);
        return;
      }

      if (!remote.state || meta.pending || meta.localUpdatedAt > remoteUpdatedAt) {
        const pushed = await pushLocalState(localState, meta, accessKey);
        if (pushed.reloaded) return;
      } else {
        saveMeta({
          localUpdatedAt: Math.max(meta.localUpdatedAt, remoteUpdatedAt),
          cloudUpdatedAt: remoteUpdatedAt,
          pending: false,
          lastSyncedAt: Date.now()
        });
      }

      setStatus("接続済み", "online");
      setMessage("スマホ・PCの記録を同期しました。", "success");
    } catch (error) {
      const meta = loadMeta();
      if (meta.localUpdatedAt) {
        meta.pending = true;
        saveMeta(meta);
      }
      setStatus(navigator.onLine ? "同期エラー" : "オフライン", "error");
      setMessage(`${error.message} 端末内の記録は残っています。`, "error");
    } finally {
      syncing = false;
      setBusy(false);
      window.setTimeout(refreshUi, 1800);
    }
  }

  async function connect() {
    if (!configured) return;
    const accessKey = ui.keyInput.value.trim();
    if (!accessKey) {
      setMessage("家族用キーを入力してください。", "error");
      ui.keyInput.focus();
      return;
    }

    syncing = true;
    setBusy(true);
    setStatus("接続確認中", "syncing");
    setMessage("家族専用クラウドへ接続しています。");

    try {
      await apiRequest("/api/state", { method: "GET" }, accessKey);
      setStoredAccessKey(accessKey);
      syncing = false;
      setBusy(false);
      refreshUi();
      await syncNow({ interactive: true, accessKey });
    } catch (error) {
      setStatus("接続できません", "error");
      setMessage(error.message, "error");
      syncing = false;
      setBusy(false);
    }
  }

  function disconnect() {
    setStoredAccessKey("");
    clearTimeout(syncTimer);
    if (ui.keyInput) ui.keyInput.value = "";
    setMessage("この端末のクラウド接続を解除しました。記録は端末内に残っています。");
    refreshUi();
  }

  Storage.prototype.setItem = function patchedSetItem(key, value) {
    originalSetItem.call(this, key, value);
    if (this === localStorage && key === APP_STORAGE_KEY) markLocalChange();
  };

  window.addEventListener("online", () => syncNow());
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") syncNow();
  });

  buildUi();

  const reloadMessage = sessionStorage.getItem(RELOAD_MESSAGE_KEY);
  if (reloadMessage) {
    sessionStorage.removeItem(RELOAD_MESSAGE_KEY);
    setMessage(reloadMessage, "success");
  }

  if (configured && getStoredAccessKey()) {
    window.setTimeout(() => syncNow(), 250);
  }
})();
