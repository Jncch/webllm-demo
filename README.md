# WebLLM STT Interpreter Demo

ブラウザ内で軽量LLM（Llama 3.2）をWebGPU経由で実行し、音声認識（STT）の生テキストからフィラーワードを除去・意訳するデモアプリケーションです。

## 構成

- **Next.js 15** (App Router / TypeScript)
- **Material UI v6**
- **WebLLM** (@mlc-ai/web-llm) - ブラウザ内LLM推論
- **Docker** (Colima対応)

## 動作要件

- Docker / Docker Compose
- WebGPU対応ブラウザ（Chrome推奨）
- GPU搭載マシン（M4 MacBook Air等で動作確認済み）

## 起動方法

```bash
docker compose up --build
```

http://localhost:3000 をChromeで開く。

## 使い方

1. モデルを選択（Llama 3.2 1B / 3B）
2. 「Load Model」をクリック → プログレスバーでダウンロード進捗表示
3. ロード完了後「Run Interpretation」をクリック
4. 左パネル（生テキスト）のセグメントが順番に処理され、右パネルに意訳結果が表示される

## モデルについて

- **Llama 3.2 1B**: 軽量・高速だが日本語品質は低い
- **Llama 3.2 3B**: 日本語の意訳品質が実用的（推奨）

モデルは初回アクセス時にブラウザへダウンロードされ、IndexedDB/Cache Storageにキャッシュされます。2回目以降は再ダウンロード不要です。

## プロンプト調整
**lib/webllm-engine.ts**内にてシステムプロンプトを設定

## キャッシュ削除

DevTools > Application > IndexedDB / Cache Storage から WebLLM関連のエントリを削除してください。
