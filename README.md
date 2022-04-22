# ランニング促進アプリ "Virtual Map Runner"

トップイメージ画像

<br>
<br>

### アプリ概要

**今まで走ってきた距離を確認して、ランナーに新たな目標を提供する web アプリケーション**です。

URL ▶︎ https://chizu-aruko.com/

- スマホからもご覧いただけます。
- Google Fit と連携している Google アカウントが必要です。
- アカウントがない場合、デモ動作を用意してあります。

イメージ画像

※ 推奨ブラウザは Chrome になります

### 解説記事( Qiita )

URL:https://qiita.com/Itoi/private/0bf7dc308ab8a8080db9

開発の背景から解説しています。

## クラウドアーキテクチャー

イメージ画像

### 技術スタック概略(詳細後述)

- **フロントエンド&バックエンド:** Rails + Unicorn + Nginx
- **インフラ:** AWS ( EC2 / RDS / ELB / Route53 )

## 実装機能一覧

### ユーザー利用機能

- Google アカウントを利用したユーザー登録(OAuth による認証)
- Google Maps API を用いた地図表示機能
- Google Route API を用いたルート検索、登録機能
- Route53 による独自ドメイン
- ELB による https 化
- レスポンシブ対応

### 非ユーザー利用機能

- ESLint および Rubocop によるコード品質の担保
- CI/CD（実装中）

## 技術スタック詳細

### バックエンド

#### 主要ライブラリ

- `omniauth-google-oauth2`: Google 認証を簡単に実装
- `rubocop`: Ruby の静的コード解析
- `dotenv-rails`: 環境変数の実装

### フロントエンド

- `google_maps_service`: Google Map の実装

### インフラ

#### `AWS(Amazon Web Service)`

アプリのデプロイ先として使用。

※利用サービス

- `EC2`: Rails / Unicorn / Nginx を導入して稼働させる仮想サーバー
- `RDS (MySQL)`: AWS が用意しているスケーラブルなデータベースエンジン
- `ALB`: 負荷分散を担うロードバランシングサービス
- `Route53`: サイトを独自ドメイン化する DNS サービス
- `ACM`: https 化のための SSL/TLS 証明書のプロビジョニング、管理、デプロイを簡単にするサービス
