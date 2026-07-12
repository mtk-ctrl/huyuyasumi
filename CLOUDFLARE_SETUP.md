# Cloudflare Worker＋D1同期の設定

ライフクエストは、Cloudflare未設定でも端末内保存で使えます。以下を設定すると、家族用キーで接続したスマホとPCの記録が同期されます。

## あなたが行う作業

### 1. D1データベースを作る
1. Cloudflare Dashboardへログインする
2. 「Storage & databases」から「D1 SQL database」を開く
3. 「Create database」を押す
4. データベース名を `lifequest-db` にする
5. 作成したデータベースの「Console」を開く
6. `cloudflare-worker/schema.sql` の内容を貼り付けて実行する

### 2. Workerを作る
1. 「Workers & Pages」を開く
2. 「Create application」からWorkerを作る
3. Worker名を `lifequest-sync` にする
4. コード編集画面で、`cloudflare-worker/src/index.js` の内容に置き換えて保存する

### 3. D1をWorkerへ接続する
1. 作成したWorkerの「Settings」または「Bindings」を開く
2. D1 database bindingを追加する
3. Variable nameを必ず `DB` にする
4. Databaseで `lifequest-db` を選ぶ

### 4. 家族用キーをSecretへ登録する
1. Workerの「Variables and Secrets」を開く
2. Secretを追加する
3. 名前を `FAMILY_ACCESS_KEY` にする
4. 推測されにくい長い家族用キーを入力する

家族用キーはGitHubのファイルへ書かず、ChatGPTにも送らないでください。スマホとPCのアプリ画面へ同じキーを入力します。

### 5. 許可する画面URLを確認する
Workerの通常の環境変数として次を設定します。

- 名前：`ALLOWED_ORIGINS`
- 値：`https://mtk-ctrl.github.io,https://htmlpreview.github.io`

正式な公開先を変更した場合は、その画面のOriginもカンマ区切りで追加します。

### 6. Worker URLをアプリへ設定する
Workerをデプロイすると、次のようなURLが表示されます。

```text
https://lifequest-sync.<あなたのサブドメイン>.workers.dev
```

`cloudflare-config.js` の値を置き換えます。

```js
window.LIFEQUEST_CLOUD = {
  workerUrl: "https://lifequest-sync.example.workers.dev"
};
```

Worker URLは秘密情報ではありません。設定を依頼する場合はURLだけ共有して構いません。

## アプリでの接続
1. ライフクエストをスマホまたはPCで開く
2. 「スマホ・PCで記録を共有」に家族用キーを入力する
3. 「接続する」を押す
4. もう一方の端末でも同じ家族用キーを入力する

家族用キーは各端末のブラウザ内へ保存されます。「この端末の接続を解除」を押すと削除されます。

## 同期の動き
- 入力直後は、まずブラウザ内へ保存
- 接続中は少し待つとWorker経由でD1へ同期
- 通信できない場合も端末内の記録は残る
- 次にオンラインになった時に同期待ちの記録を送信
- スマホとPCに違う記録がある場合は、更新日時が新しい方を採用
- 同じ時刻に両方の端末で編集する運用は避ける

## CLIで設定する場合
`cloudflare-worker` ディレクトリで次を実行できます。

```bash
npm install
npx wrangler d1 create lifequest-db
```

表示されたD1の `database_id` を `wrangler.jsonc` に設定してから、次を実行します。

```bash
npm run db:init
npx wrangler secret put FAMILY_ACCESS_KEY
npm run deploy
```

`FAMILY_ACCESS_KEY` はコマンド実行時に入力し、ファイルには保存しません。
