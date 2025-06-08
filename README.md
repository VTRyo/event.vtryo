# Food Event Websites - モノレポ

マネーフォワードChief Food Officerによる食事イベントの宣伝サイト集です。

## プロジェクト構造

```
tessi_vtryo_night/
├── README.md                    # このファイル
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

## 現在のイベント

### 福岡 2025年 - Tesshie & VTRyo Night!
- **パス**: `fukuoka/2025/tesshie_vtryo_night/`
- **日時**: 2025年8月23日 18:00-21:00
- **シェフ**: Tesshie（手島尚人）& VTRyo（りょう）
- **会場**: 食の交流拠点 るるるる

## Netlify設定

### 現在のサイト
- **Publish directory**: `fukuoka/2025/tesshie_vtryo_night`
- **Build command**: `echo 'No build step required'` (ビルド不要)

### 新しいイベント追加時の設定手順

1. **新しいディレクトリ作成**:
   ```bash
   mkdir -p [place_name]/[year]/[event_name]
   ```

2. **テンプレートからコピー**:
   ```bash
   cp -r shared/template/* [place_name]/[year]/[event_name]/
   ```

3. **Netlifyで新しいサイト作成**:
   - Build settings → Publish directory: `[place_name]/[year]/[event_name]`
   - Build command: `echo 'No build step required'`

4. **イベント設定編集**:
   - `[event_name]/index.html` の `EVENT_CONFIG` オブジェクトを編集

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
3. Netlifyで新しいサイトとしてデプロイ

---
*このプロジェクトはビルドプロセス不要の静的サイトとして構成されています。*
