## プロジェクト構造

```
tessi_vtryo_night/
├── README.md                    # このファイル
├── index.html                   # 動的イベント一覧ページ
├── netlify.toml                 # Netlify設定
├── images/                      # 共通画像フォルダ
├── shared/                      # 共通リソース
│   ├── template/               # 基本テンプレート
│   ├── components/             # 再利用可能コンポーネント
│   └── styles/                 # 共通スタイル
└── [place_name]/[year]/[event_name]/  # イベント別サイト
    ├── fukuoka/
    │   └── 2025/
    │       └── tesshie_vtryo_night/
    │           ├── index.html
    │           ├── script.js
    │           ├── style.css
    │           ├── CLAUDE.md
    │           └── todo.md
    ├── tokyo/
    │   └── 2025/
    │       └── [future_event]/
    └── osaka/
        └── 2025/
            └── [future_event]/
```

## 動的イベント一覧システム

### 概要
ルートの `index.html` は、各イベントの詳細ページから自動的に情報を取得して一覧表示する動的システムです。

### URL構造
- **イベント一覧**: `https://event.vtryo.me/`
- **個別イベント**: `https://event.vtryo.me/fukuoka/2025/tesshie_vtryo_night`

### 自動取得される情報
各イベントの `EVENT_CONFIG` オブジェクトから以下の情報を自動取得：
- **イベントタイトル**: `EVENT_CONFIG.event.title`
- **開催日時**: `EVENT_CONFIG.event.date` + `EVENT_CONFIG.event.time`
- **会場名**: `EVENT_CONFIG.venue.name`
- **シェフ名**: `EVENT_CONFIG.chefs` から抽出・結合
- **キャッチフレーズ**: `EVENT_CONFIG.event.catchphrase`

### 新しいイベントの一覧への追加

#### 1. イベントディレクトリとファイルの作成
```bash
# 新しいイベント用ディレクトリ作成
mkdir -p tokyo/2025/spring_event

# テンプレートからコピー
cp -r shared/template/* tokyo/2025/spring_event/

# EVENT_CONFIGを編集
# tokyo/2025/spring_event/index.html の EVENT_CONFIG オブジェクトを更新
```

#### 2. 一覧ページの設定更新
ルートの `index.html` にある `EVENT_MAPPINGS` 配列に新しいイベントを追加：

```javascript
const EVENT_MAPPINGS = [
    {
        path: '/fukuoka/2025/tesshie_vtryo_night',
        configUrl: '/fukuoka/2025/tesshie_vtryo_night/index.html'
    },
    {
        path: '/tokyo/2025/spring_event',
        configUrl: '/tokyo/2025/spring_event/index.html'
    }
    // さらに追加可能
];
```

#### 3. netlify.tomlの更新
新しいイベントのリダイレクト設定を追加：

```toml
# 東京イベント用の設定例
[[redirects]]
  from = "/tokyo/2025/spring_event"
  to = "/tokyo/2025/spring_event/index.html"
  status = 200

[[redirects]]
  from = "/tokyo/2025/spring_event/*"
  to = "/tokyo/2025/spring_event/:splat"
  status = 200
```

## Netlify設定

### 現在のサイト設定
- **Publish directory**: `.` (ルートディレクトリ)
- **Build command**: `echo 'No build step required'` (ビルド不要)
- **リダイレクト**: `netlify.toml`でパス別にルーティング

### 新しいイベント追加時の設定手順

1. **新しいディレクトリ作成**:
   ```bash
   mkdir -p [place_name]/[year]/[event_name]
   ```

2. **テンプレートからコピー**:
   ```bash
   cp -r shared/template/* [place_name]/[year]/[event_name]/
   ```

3. **一覧ページに追加**: 上記の「新しいイベントの一覧への追加」に従う

4. **netlify.tomlにリダイレクト追加**: 新しいパス用の設定を追加

## 開発ガイド

### ファイル編集
各イベントサイトは独立しており、以下のファイルを編集できます：

- **index.html**: イベント設定（`EVENT_CONFIG`）とHTML構造
- **script.js**: JavaScript機能とインタラクティブ要素
- **style.css**: CSS スタイリング
- **CLAUDE.md**: Claude Code用の開発ガイダンス

### 設定データ構造
`EVENT_CONFIG` オブジェクトで以下を管理：
- イベント詳細（タイトル、日時、説明）
- シェフプロフィール
- コース料理メニュー
- ドリンクメニュー
- 料金設定
- 会場情報

### 共通リソース
- **shared/template/**: 新しいイベント用の基本テンプレート
- **shared/components/**: 再利用可能なコンポーネント
- **shared/styles/**: 共通CSSスタイル
- **images/**: 共通で使用する画像ファイル

## メンテナンス

### コード更新
1. ローカルでファイル編集
2. Gitにコミット・プッシュ
3. Netlifyで自動デプロイ

### 新しいイベント追加
1. 上記の「新しいイベント追加時の設定手順」に従う
2. テンプレートをカスタマイズ
3. 一覧ページの設定更新（`EVENT_MAPPINGS`）
4. `netlify.toml`のリダイレクト設定追加

### 一覧ページのトラブルシューティング

#### よくある問題
- **イベントが表示されない**: `EVENT_MAPPINGS`の設定とパスを確認
- **データが取得できない**: `EVENT_CONFIG`の記述にシンタックスエラーがないか確認
- **日付フォーマットエラー**: 日付が `YYYY-MM-DD` 形式になっているか確認

#### デバッグ方法
```javascript
// ブラウザの開発者ツールで確認
console.log('EVENT_MAPPINGS:', EVENT_MAPPINGS);
// エラーログの確認
```

---
*このプロジェクトはビルドプロセス不要の静的サイトとして構成されています。*
