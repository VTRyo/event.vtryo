# 画像表示とリダイレクト問題の解決計画

## 問題の概要

1. **画像が表示されない**: JavaScriptが生成する画像パスと実際のファイル配置が一致しない
2. **リダイレクト問題**: netlify.tomlの設定が複雑で、シンプルな構造が望ましい

## 解決アプローチ

### 1. 画像パスの修正
- JavaScriptでの動的パス生成を廃止
- EVENT_CONFIGで絶対パスを直接指定
- buildImagePath関数の削除

### 2. netlify.tomlの簡素化
- リダイレクト設定を削除
- ルートindex.htmlをメインページとして使用

## 実装手順

### Phase 1: 画像パスの修正

**ファイル**: `fukuoka/2025/tesshie_vtryo_night/index.html`

変更前:
```javascript
gallery: [
    "gallery/IMG_6059.jpeg",
    "gallery/IMG_6058.jpeg",
    // ...
]
```

変更後:
```javascript
gallery: [
    "/images/fukuoka/2025/tesshie_vtryo_night/gallery/IMG_6059.jpeg",
    "/images/fukuoka/2025/tesshie_vtryo_night/gallery/IMG_6058.jpeg",
    // ...
]
```

**ファイル**: `fukuoka/2025/tesshie_vtryo_night/script.js`
- buildImagePath関数の削除
- 画像パス生成ロジックの簡素化

### Phase 2: netlify.tomlの簡素化

**変更内容**:
- リダイレクト設定（lines 6-20）を削除
- ヘッダー設定とビルド設定は維持

### Phase 3: 動作確認

**確認項目**:
- ✅ ルートページでイベント一覧が表示される
- ✅ 個別イベントページで画像が正しく表示される
- ✅ 両ページ間のナビゲーションが正常に動作する

## 期待される結果

- 全ての画像が正しく表示される
- URLが期待通りの構造になる
- シンプルで保守しやすい設定になる

## 実装日時

2025年6月8日 18:40
