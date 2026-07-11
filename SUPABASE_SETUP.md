# Supabase連携の設定

ライフクエストは、Supabase未設定でも端末内保存で使えます。以下を設定すると、同じ保護者アカウントでログインしたスマホとPCの記録が同期されます。

## 保護者が行う作業

### 1. Supabaseプロジェクトを作る
1. Supabaseへログインする
2. 新しいプロジェクトを作成する
3. データベースのパスワードは安全な場所へ保存する

### 2. テーブルとアクセス制御を作る
1. Supabase Dashboardの「SQL Editor」を開く
2. リポジトリの `supabase/schema.sql` を貼り付けて実行する

このSQLは、ログインした本人だけが自分の記録を読み書きできるRLSポリシーも作成します。

### 3. 保護者アカウントを1つ作る
1. Dashboardの「Authentication」→「Users」を開く
2. 「Add user」から保護者のメールアドレスとパスワードを登録する
3. 子どもごとのアカウントは作らない

パスワードはリポジトリやChatGPTへ貼らないでください。

### 4. 公開用の接続情報を設定する
1. DashboardのProject Settingsから次を確認する
   - Project URL
   - Publishable key（旧表示では anon key）
2. `supabase-config.js` の次の2か所を置き換える

```js
window.LIFEQUEST_SUPABASE = {
  url: "https://xxxxx.supabase.co",
  publishableKey: "公開用のキー",
  allowSignUp: false
};
```

Project URLとPublishable keyはブラウザ向けの公開用情報です。`service_role` keyはRLSを迂回できるため、絶対にHTMLやJavaScriptへ入れないでください。

## 同期の動き
- 入力直後は、まずブラウザ内へ保存
- ログイン中は、少し待つとSupabaseへ同期
- 通信できない場合も端末内の記録は残る
- 次に接続した時に同期待ちの記録を送信
- 別端末で新しい記録がある場合は、新しい方を取得して画面を更新

## データ構成
Supabaseには、長男・長女・次女を含むアプリ全体の状態を、保護者アカウントごとに1行のJSONとして保存します。

- テーブル：`lifequest_state`
- 主キー：`user_id`
- 記録本体：`state`（JSONB）
- 更新日時：`updated_at`

家族1組・3人で使うため、複雑な複数家庭テーブルは作っていません。
