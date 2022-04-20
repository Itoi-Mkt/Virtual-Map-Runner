# ランニング促進アプリ "Virtual Map Runner"

トップイメージ画像
<!-- ![guest_login](https://user-images.githubusercontent.com/57904570/128120894-8cb3de67-6f5e-4175-965e-0222509c0f32.png) -->


<br>
<br>

### アプリ概要

**今まで走ってきた距離を確認して、ランナーに新たな目標を提供する webアプリケーション**です。

URL ▶︎ https://chizu-aruko.com/

-   スマホからもご覧いただけます。
-   Google Fitと連携しているGoogleアカウントが必要です。
-   アカウントがない場合、デモ動作を用意してあります。

    ログインイメージ画像
    <!-- ![guest_login](https://user-images.githubusercontent.com/57904570/128120894-8cb3de67-6f5e-4175-965e-0222509c0f32.png) -->

※ 推奨ブラウザはChromeになります

### 解説記事( Qiita )
URL:

開発の背景から解説しています。

### 開発者Twitter
URL:

## クラウドアーキテクチャー
<!-- ![image](https://user-images.githubusercontent.com/56747224/110200543-dbf47e80-7ea1-11eb-8c91-227bd310faa9.png) -->

### 技術スタック概略(詳細後述)
- **Frontend & Backend:** Rails + Unicorn + Nginx
- **Infra:** AWS ( EC2 / RDS / ELB / Route53 )

## 実装機能一覧
### ユーザー利用機能
- Googleアカウントを利用したユーザー登録(OAuthによる認証)
- Google Maps API を用いた地図表示機能
- Google Route API を用いたルート検索, 登録機能
- Route53, ELB による独自ドメイン + https化
- レスポンシブ対応

### 非ユーザー利用機能
- Netlify の Pre-rendering 機能活用によるOGP情報の保持（Twitter card 表示用）
- その他セキュリティ対策(XXS, CSPF等)

## 技術スタック詳細
### Backend: Rails + Unicorn + Nginx
#### 主要gem
<!-- - ``devise_token_auth``： APIモードでの devise。トークン認証を簡単に実装 -->
- ``omniauth-google-oauth2``：Twitter認証を簡単に実装
- ``rubocop``： Rubyの静的コード解析
- ``dotenv-rails``
- ````
- ````
- ````

### Frontend: React

``creat-react-app`` をベースに開発。ホスティングには ``Netlify`` を使用。
<!-- - ``eslint & prettier``: javascriptに対する静的コード解析-->

### Infra

#### ``AWS(Amazon Web Service)``

主にBackend( Rails+Nginx )のデプロイで使用。

※利用サービス
- ``EC2``: Rails / Unicorn / Nginx を入れて稼働させる仮想サーバー
- ``RDS (MySQL)``: AWS が用意しているスケーラブルなデータベースエンジン
- ``ALB``: 負荷分散を担うロードバランシングサービス
- ``Route53``: サイトの独自ドメイン化に使用
- ``ACM``: サイトの https 化に使用