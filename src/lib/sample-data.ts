import type { TranscriptSegment, ModelOption } from "@/types";

export const sampleTranscript: TranscriptSegment[] = [
  {
    id: 1,
    speaker: "Speaker A",
    timestamp: "00:00:03",
    rawText:
      "えーっとですね、今回のプロジェクトの進捗なんですけども、えー、まあ大体予定通りに進んでおりまして、えー、特に大きな問題はないかなと。",
  },
  {
    id: 2,
    speaker: "Speaker B",
    timestamp: "00:00:12",
    rawText:
      "あー、なるほど、ありがとうございます。えっと、あの、クライアント側からなんかフィードバックとかって来てたりしますか。",
  },
  {
    id: 3,
    speaker: "Speaker A",
    timestamp: "00:00:18",
    rawText:
      "あー、はい、えーっと、先週の金曜日にですね、まあメールでいくつかいただいてまして、えー、主にUIのデザインのところで、まあ色味をもうちょっと落ち着いた感じにしてほしいっていうのと、あとフォントサイズをもう少し大きくしてほしいっていう、まあその二点ですかね。",
  },
  {
    id: 4,
    speaker: "Speaker B",
    timestamp: "00:00:35",
    rawText:
      "了解です。えー、それはまあ、あの、対応可能な範囲だと思うので、今週中にはちょっと直しておきますね。",
  },
  {
    id: 5,
    speaker: "Speaker C",
    timestamp: "00:00:42",
    rawText:
      "すみません、あの、ちょっと別件なんですけど、えーと、サーバーのほうでちょっと気になることがありまして、あの、レスポンスタイムが最近ちょっと遅くなってきてるんですよね。",
  },
  {
    id: 6,
    speaker: "Speaker A",
    timestamp: "00:00:55",
    rawText:
      "あー、それはちょっと気になりますね。えっと、具体的にはどのくらい遅くなってる感じですか。",
  },
  {
    id: 7,
    speaker: "Speaker C",
    timestamp: "00:01:02",
    rawText:
      "えーっと、まあ以前は大体200ミリ秒くらいだったのが、今は500ミリ秒から、ひどいときは1秒くらいかかってるときがあって、まあちょっとユーザーに影響出てるかもしれないなと。",
  },
  {
    id: 8,
    speaker: "Speaker B",
    timestamp: "00:01:15",
    rawText:
      "うーん、それ結構深刻ですね。あの、DBのクエリのほうがボトルネックになってる可能性もあると思うんで、ちょっとそのへんも調べてみたほうがいいかもしれないですね。",
  },
];

export const modelOptions: ModelOption[] = [
  { id: "Llama-3.2-1B-Instruct-q4f16_1-MLC", label: "Llama 3.2 1B (q4f16)" },
  { id: "Llama-3.2-1B-Instruct-q4f32_1-MLC", label: "Llama 3.2 1B (q4f32)" },
  { id: "Llama-3.2-3B-Instruct-q4f16_1-MLC", label: "Llama 3.2 3B (q4f16)" },
  { id: "Llama-3.2-3B-Instruct-q4f32_1-MLC", label: "Llama 3.2 3B (q4f32)" },
];
