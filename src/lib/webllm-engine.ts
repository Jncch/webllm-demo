import * as webllm from "@mlc-ai/web-llm";
import type { ModelId } from "@/types";

let engine: webllm.MLCEngineInterface | null = null;
let currentModelId: ModelId | null = null;

export async function loadModel(
  modelId: ModelId,
  onProgress: (report: { text: string; progress: number }) => void
): Promise<void> {
  if (engine && currentModelId === modelId) return;

  if (engine) {
    engine.unload();
    engine = null;
    currentModelId = null;
  }

  engine = await webllm.CreateMLCEngine(modelId, {
    initProgressCallback: (report) => {
      onProgress({ text: report.text, progress: report.progress });
    },
  });
  currentModelId = modelId;
}

const SYSTEM_PROMPT = `あなたは日本語の音声認識テキストを整理するアシスタントです。
以下のルールに従ってテキストを整理してください：
- フィラーワード（えー、あー、あの、まあ、えーっと、うーん、なんか、その、ですね等）を除去する
- 文法を自然な日本語に整える
- 元の発言の意味と意図を正確に保つ
- 簡潔で読みやすい文にする
- 整理後のテキストのみを出力し、説明は不要`;

export async function interpretSegment(rawText: string): Promise<string> {
  if (!engine) throw new Error("Model not loaded");

  const reply = await engine.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `以下の音声認識テキストを整理してください：\n\n${rawText}`,
      },
    ],
    max_tokens: 512,
    temperature: 0.3,
  });

  return reply.choices[0]?.message?.content ?? "";
}

export function isModelLoaded(): boolean {
  return engine !== null;
}
