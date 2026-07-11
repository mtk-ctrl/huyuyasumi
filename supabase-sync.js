(() => {
  "use strict";

  const APP_STORAGE_KEY = "huyuyasumi-lifequest-v4";
  const META_STORAGE_KEY = "huyuyasumi-lifequest-sync-meta-v1";
  const TABLE_NAME = "lifequest_state";
  const config = window.LIFEQUEST_SUPABASE || {};
  const originalSetItem = Storage.prototype.setItem;
  let client = null;
  let currentUser = null;
  let applyingRemoteState = false;
  let pushTimer = null;
  let syncing = false;

  const configured = Boolean(
    config.url &&
    config.publishableKey &&
    !String(config.url).includes("YOUR_") &&
    !String(config.publishableKey).includes("YOUR_")
  );

  const state = {
    root: null,
    status: null,
    authArea: null,
    emailInput: null,
    passwordInput: null,
    loginButton: null,
    signupButton: null,
    logoutButton: null,
    syncButton: null,
    userLabel: null,
    message: null
  };

  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .cloud-sync-card{max-width:860px;margin:0 auto 14px;padding:16px 18px;border-radius:24px;display:grid;gap:12px}
      .cloud-sync-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
      .cloud-sync-head h2{margin:0;font-size:18px}.cloud-sync-head p{margin:4px 0 0;color:var(--muted);font-size:11px;line-height:1.5}
      .cloud-status{display:inline-flex;align-items:center;gap:7px;flex:0 0 auto;padding:8px 11px;border:1px solid var(--line);border-radius:999px;color:var(--muted);background:rgba(255,255,255,.05);font-size:10px;font-weight:800}
      .cloud-status::before{content:"";width:8px;height:8px;border-radius:50%;background:#aab3ca;box-shadow:0 0 10px rgba(170,179,202,.4)}
      .cloud-status[data-tone="ok"]{color:#b8ffe1}.cloud-status[data-tone="ok"]::before{background:#83ffc3;box-shadow:0 0 12px #83ffc3}
      .cloud-status[data-tone="busy"]{color:#c9f8ff}.cloud-status[data-tone="busy"]::before{background:#82f4ff;animation:pulse 1s ease-in-out infinite}
      .cloud-status[data-tone="warn"]{color:#ffe5a0}.cloud-status[data-tone="warn"]::before{background:#ffd76c}
      .cloud-auth-form{display:grid;grid-template-columns:1.25fr 1fr auto;gap:8px}.cloud-auth-form input{min-width:0;padding:11px 12px;border:1px solid var(--line);border-radius:13px;color:var(--ink);background:rgba(4,10,30,.48);outline:none}
      .cloud-auth-form input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(130,244,255,.12)}
      .cloud-auth-form button,.cloud-user-actions button{min-height:42px;padding:9px 13px;border:0;border-radius:13px;font-weight:900;cursor:pointer}
      .cloud-login-button,.cloud-sync-button{color:#14203a;background:linear-gradient(135deg,#a7f7ff,#bba9ff)}
      .cloud-signup-button{color:#17203a;background:linear-gradient(135deg,#ffe89a,#ffb777)}
      .cloud-logout-button{color:var(--muted);border:1px solid var(--line)!important;background:rgba(255,255,255,.05)}
      .cloud-user-row{display:flex;align-items:center;justify-content:space-between;gap:10px}.cloud-user-row strong{display:block;font-size:13px}.cloud-user-row small{display:block;margin-top:3px;color:var(--muted);font-size:10px}.cloud-user-actions{display:flex;gap:8px}
      .cloud-message{margin:0;color:var(--muted);font-size:10px;line-height:1.55}.cloud-message.error{color:#ffb6c9}.cloud-message.success{color:#a9ffd9}
      @media(max-width:700px){.cloud-sync-head{align-items:flex-start}.cloud-auth-form{grid-template-columns:1fr}.cloud-user-row{align-items:flex-start;flex-direction:column}.cloud-user-actions{width:100%}.cloud-user-actions button{flex:1}}
    `;
    document.head.appendChild(style);
  }

  function injectUi() {
    const anchor = document.querySelector(".family-deck");
    if (!anchor) return;

    const card = document.createElement("section");
    card.className = "cloud-sync-card glass";
    card.setAttribute("aria-label", "クラウド同期");
    card.innerHTML = `
      <div class="cloud-sync-head">
        <div>
          <h2>☁️ スマホ・PC同期</h2>
          <p>入力はまずこの端末へ保存し、ログイン中はSupabaseにも同期します。</p>
        </div>
        <span class="cloud-status" data-tone="warn">端末内保存</span>
      </div>
      <div class="cloud-auth-area"></div>
      <p class="cloud-message" role="status" aria-live="polite"></p>
    `;
    anchor.insertAdjacentElement("afterend", card);

    state.root = card;
    state.status = card.querySelector(".cloud-status");
    state.authArea = card.querySelector(".cloud-auth-area");
    state.message = card.querySelector(".cloud-message");

    const privacyNote = document.querySelector(".privacy-note");
    if (privacyNote) {
      privacyNote.textContent = "端末内へすぐ保存。Supabase設定後は、同じアカウントのスマホ・PCへ同期します。";
    }
  }

  function setStatus(text, tone = "warn") {
    if (!state.status) return;
    state.status.textContent = text;
    state.status.dataset.tone = tone;
  }

  function setMessage(text = "", type = "") {
    if (!state.message) return;
    state.message.textContent = text;
    state.message.className = `cloud-message${type ? ` ${type}` : ""}`;
  }

  function readJson(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeRaw(key, value) {
    originalSetItem.call(localStorage, key, value);
  }

  function readMeta() {
    return readJson(META_STORAGE_KEY, { updatedAt: "", dirty: false });
  }

  function writeMeta(meta) {
    writeRaw(META_STORAGE_KEY, JSON.stringify(meta));
  }

  function markLocalChange() {
    const updatedAt = new Date().toISOString();
    writeMeta({ updatedAt, dirty: true });
    setStatus(currentUser ? "同期待ち" : "端末内保存", "warn");
    if (currentUser) schedulePush();
  }

  function patchLocalStorage() {
    Storage.prototype.setItem = function patchedSetItem(key, value) {
      originalSetItem.call(this, key, value);
      if (this === localStorage && key === APP_STORAGE_KEY && !applyingRemoteState) {
        markLocalChange();
      }
    };
  }

  function localState() {
    return readJson(APP_STORAGE_KEY, null);
  }

  function localTimestamp() {
    const meta = readMeta();
    const time = Date.parse(meta.updatedAt || "");
    return Number.isFinite(time) ? time : 0;
  }

  function renderLoggedOut() {
    if (!state.authArea) return;
    state.authArea.innerHTML = `
      <form class="cloud-auth-form">
        <input type="email" autocomplete="email" placeholder="保護者のメールアドレス" required>
        <input type="password" autocomplete="current-password" placeholder="パスワード" required minlength="6">
        <button class="cloud-login-button" type="submit">ログイン</button>
        ${config.allowSignUp ? '<button class="cloud-signup-button" type="button">初回登録</button>' : ""}
      </form>
    `;
    const form = state.authArea.querySelector("form");
    state.emailInput = form.querySelector('input[type="email"]');
    state.passwordInput = form.querySelector('input[type="password"]');
    state.loginButton = form.querySelector(".cloud-login-button");
    state.signupButton = form.querySelector(".cloud-signup-button");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      await signIn();
    });
    state.signupButton?.addEventListener("click", signUp);
    setStatus("ログイン待ち", "warn");
  }

  function renderLoggedIn() {
    if (!state.authArea || !currentUser) return;
    state.authArea.innerHTML = `
      <div class="cloud-user-row">
        <div><strong>ログイン中</strong><small class="cloud-user-label"></small></div>
        <div class="cloud-user-actions">
          <button class="cloud-sync-button" type="button">今すぐ同期</button>
          <button class="cloud-logout-button" type="button">ログアウト</button>
        </div>
      </div>
    `;
    state.userLabel = state.authArea.querySelector(".cloud-user-label");
    state.userLabel.textContent = currentUser.email || "保護者アカウント";
    state.syncButton = state.authArea.querySelector(".cloud-sync-button");
    state.logoutButton = state.authArea.querySelector(".cloud-logout-button");
    state.syncButton.addEventListener("click", () => reconcile({ manual: true }));
    state.logoutButton.addEventListener("click", signOut);
  }

  async function signIn() {
    if (!client || !state.emailInput || !state.passwordInput) return;
    const email = state.emailInput.value.trim();
    const password = state.passwordInput.value;
    if (!email || !password) return;

    setStatus("ログイン中", "busy");
    setMessage("");
    state.loginButton.disabled = true;
    const { error } = await client.auth.signInWithPassword({ email, password });
    state.loginButton.disabled = false;
    if (error) {
      setStatus("ログイン失敗", "warn");
      setMessage(`ログインできませんでした：${error.message}`, "error");
    }
  }

  async function signUp() {
    if (!client || !state.emailInput || !state.passwordInput) return;
    const email = state.emailInput.value.trim();
    const password = state.passwordInput.value;
    if (!email || password.length < 6) {
      setMessage("メールアドレスと6文字以上のパスワードを入力してください。", "error");
      return;
    }

    setStatus("登録中", "busy");
    setMessage("");
    const { data, error } = await client.auth.signUp({ email, password });
    if (error) {
      setStatus("登録失敗", "warn");
      setMessage(`登録できませんでした：${error.message}`, "error");
      return;
    }
    if (!data.session) {
      setStatus("メール確認待ち", "warn");
      setMessage("確認メールを開いたあと、同じメールアドレスでログインしてください。", "success");
    }
  }

  async function signOut() {
    if (!client) return;
    setStatus("ログアウト中", "busy");
    const { error } = await client.auth.signOut();
    if (error) setMessage(`ログアウトできませんでした：${error.message}`, "error");
  }

  async function fetchRemote() {
    if (!client || !currentUser) return null;
    const { data, error } = await client
      .from(TABLE_NAME)
      .select("state, updated_at")
      .eq("user_id", currentUser.id)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  async function pushLocal() {
    if (!client || !currentUser || syncing) return;
    const appState = localState();
    if (!appState) return;

    syncing = true;
    setStatus("同期中", "busy");
    setMessage("");
    try {
      const meta = readMeta();
      const updatedAt = meta.updatedAt || new Date().toISOString();
      const { error } = await client.from(TABLE_NAME).upsert(
        {
          user_id: currentUser.id,
          state: appState,
          updated_at: updatedAt
        },
        { onConflict: "user_id" }
      );
      if (error) throw error;
      writeMeta({ updatedAt, dirty: false });
      setStatus("同期済み", "ok");
      setMessage("スマホとPCで同じ記録を使えます。", "success");
    } catch (error) {
      setStatus("端末に保存済み", "warn");
      setMessage(`クラウド同期は保留中です：${error.message}`, "error");
    } finally {
      syncing = false;
    }
  }

  function schedulePush() {
    clearTimeout(pushTimer);
    pushTimer = window.setTimeout(pushLocal, 700);
  }

  function applyRemote(remote) {
    applyingRemoteState = true;
    try {
      writeRaw(APP_STORAGE_KEY, JSON.stringify(remote.state));
      writeMeta({ updatedAt: remote.updated_at, dirty: false });
    } finally {
      applyingRemoteState = false;
    }
  }

  async function reconcile({ manual = false } = {}) {
    if (!client || !currentUser || syncing) return;
    syncing = true;
    setStatus("確認中", "busy");
    setMessage("");

    try {
      const remote = await fetchRemote();
      const appState = localState();
      const meta = readMeta();
      const localTime = localTimestamp();
      const remoteTime = remote ? Date.parse(remote.updated_at) || 0 : 0;

      if (!remote) {
        syncing = false;
        await pushLocal();
        return;
      }

      if (!appState || remoteTime > localTime) {
        applyRemote(remote);
        setStatus("最新データを取得", "ok");
        setMessage("クラウドの記録をこの端末へ反映しました。", "success");
        window.setTimeout(() => window.location.reload(), 350);
        return;
      }

      if (meta.dirty || localTime > remoteTime) {
        syncing = false;
        await pushLocal();
        return;
      }

      setStatus("同期済み", "ok");
      if (manual) setMessage("すでに最新です。", "success");
    } catch (error) {
      setStatus("端末に保存済み", "warn");
      setMessage(`クラウドへ接続できません：${error.message}`, "error");
    } finally {
      syncing = false;
    }
  }

  async function handleSession(session) {
    currentUser = session?.user || null;
    if (!currentUser) {
      renderLoggedOut();
      setMessage("ログインしなくても、この端末内には保存されます。");
      return;
    }
    renderLoggedIn();
    await reconcile();
  }

  async function initialize() {
    injectStyles();
    injectUi();
    patchLocalStorage();

    if (!configured) {
      setStatus("Supabase未設定", "warn");
      setMessage("現在は端末内保存です。設定ファイルを入れるとスマホ・PC同期が有効になります。");
      return;
    }

    if (!window.supabase?.createClient) {
      setStatus("同期ライブラリ未読込", "warn");
      setMessage("通信できないため端末内保存で動作しています。", "error");
      return;
    }

    client = window.supabase.createClient(config.url, config.publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });

    const { data, error } = await client.auth.getSession();
    if (error) {
      setMessage(`ログイン状態を確認できません：${error.message}`, "error");
      renderLoggedOut();
    } else {
      await handleSession(data.session);
    }

    client.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") handleSession(session);
      if (event === "SIGNED_OUT") {
        currentUser = null;
        renderLoggedOut();
        setMessage("ログアウトしました。端末内の記録は残っています。", "success");
      }
    });

    window.addEventListener("online", () => reconcile());
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && currentUser) reconcile();
    });
  }

  window.lifeQuestCloud = {
    sync: () => reconcile({ manual: true }),
    isConfigured: () => configured,
    isSignedIn: () => Boolean(currentUser)
  };

  initialize().catch((error) => {
    setStatus("端末内保存", "warn");
    setMessage(`同期機能を開始できませんでした：${error.message}`, "error");
  });
})();
