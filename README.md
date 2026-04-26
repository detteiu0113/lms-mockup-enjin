# えん人 LMS モックアップ

合同会社えん人 LMS構築プロジェクトのデモ用モックアップ。

業種別カリキュラムで現場の営業・接客力を底上げするための学習管理システム(LMS)です。

## 構成

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **TailwindCSS v4**
- モックデータのみ（バックエンド不要）

## 起動方法

```bash
npm install
npm run dev
```

ポート競合を避けるため、起動時に `PORT=3001` 等を付与して別ポートでの起動も可能です。

```bash
PORT=3001 npm run dev
```

## 画面構成

デモトップ (`/`) から 4 つのロール画面に遷移できます。

### 受講者(従業員) `/student`
- ログイン (`/login`)
- 業種選択 (`/student/industry`)
- マイコース (`/student`)
- コース詳細 (`/student/courses/[courseId]`)
- 動画再生 (`/student/courses/[courseId]/videos/[videoId]`)
- 修了証一覧 (`/student/certificates`)
- 修了証プレビュー (`/student/certificates/[courseId]`)
- 学習履歴 (`/student/history`)

### クライアント企業管理者 `/company`
- ダッシュボード (`/company`)
- 受講者管理 (`/company/learners`)
- 受講者詳細 (`/company/learners/[learnerId]`)
- 学習記録エクスポート (`/company/export`)

### 合同会社えん人 (運営) `/enjin`
- 概要 (`/enjin`)
- クライアント企業 (`/enjin/companies`)
- 受講者 (`/enjin/learners`)

### NOMIEL (開発・コンテンツ運用) `/nomiel`
- 概要 (`/nomiel`)
- 業種管理 (`/nomiel/industries`)
- コース・動画 (`/nomiel/courses`)

## ディレクトリ

```
app/              # App Router ページ
components/       # 再利用コンポーネント
  common/         # ボタン、カード、プログレスバー等
  player/         # 動画プレイヤー
  certificate/    # 修了証プレビュー
lib/              # ユーティリティ(フォーマット・セレクタ)
mocks/            # ダミーデータ
types/            # 型定義
```

## デモで確認できる基本機能

- 動画ストリーミング再生(レジューム対応)
- 秒単位の視聴ログ記録
- 受講進捗の自動管理
- 累計学習時間の自動集計
- 修了証PDF自動発行(プレビュー)
- 業種別コース分岐 (共通ベース + 業種別の2階層)
- 受講者 ID 発行・アカウント管理
- 学習記録 CSV / PDF エクスポート(モック)

## 注意

- 本リポジトリは**モックアップ**であり、認証・永続化・実際のファイルアップロード等は実装されていません
- 視聴する動画は Big Buck Bunny (CC-BY) のサンプル動画を使用しています
