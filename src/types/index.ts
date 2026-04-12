export interface TranscriptSegment {
  id: number;
  speaker: string;
  timestamp: string;
  rawText: string;
}

export interface InterpretedSegment extends TranscriptSegment {
  interpretedText: string;
  status: "pending" | "processing" | "done" | "error";
}

export type ModelId =
  | "Llama-3.2-1B-Instruct-q4f16_1-MLC"
  | "Llama-3.2-1B-Instruct-q4f32_1-MLC"
  | "Llama-3.2-3B-Instruct-q4f16_1-MLC"
  | "Llama-3.2-3B-Instruct-q4f32_1-MLC";

export interface ModelOption {
  id: ModelId;
  label: string;
}
