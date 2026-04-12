"use client";

import { useState, useCallback, useRef } from "react";
import { Box, Button, Chip, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import type { InterpretedSegment, ModelId } from "@/types";
import { sampleTranscript } from "@/lib/sample-data";
import { loadModel, interpretSegment } from "@/lib/webllm-engine";
import ModelLoader from "./ModelLoader";
import TranscriptPanel from "./TranscriptPanel";
import ResultPanel from "./ResultPanel";

type ModelStatus = "idle" | "loading" | "ready" | "error";

const statusConfig: Record<ModelStatus, { label: string; color: "default" | "warning" | "success" | "error" }> = {
  idle: { label: "Not Loaded", color: "default" },
  loading: { label: "Loading...", color: "warning" },
  ready: { label: "Ready", color: "success" },
  error: { label: "Error", color: "error" },
};

export default function ClientApp() {
  const [selectedModel, setSelectedModel] = useState<ModelId>("Llama-3.2-1B-Instruct-q4f16_1-MLC");
  const [modelStatus, setModelStatus] = useState<ModelStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [segments, setSegments] = useState<InterpretedSegment[]>(
    sampleTranscript.map((s) => ({ ...s, interpretedText: "", status: "pending" }))
  );
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const cancelRef = useRef(false);

  const handleLoadModel = useCallback(async () => {
    setModelStatus("loading");
    setProgress(0);
    setProgressText("");
    try {
      await loadModel(selectedModel, (report) => {
        setProgress(report.progress);
        setProgressText(report.text);
      });
      setModelStatus("ready");
    } catch (e) {
      console.error("Model load failed:", e);
      setModelStatus("error");
    }
  }, [selectedModel]);

  const handleRun = useCallback(async () => {
    setIsProcessing(true);
    cancelRef.current = false;
    setSegments(sampleTranscript.map((s) => ({ ...s, interpretedText: "", status: "pending" })));

    for (let i = 0; i < sampleTranscript.length; i++) {
      if (cancelRef.current) break;

      const seg = sampleTranscript[i];
      setProcessingId(seg.id);
      setSegments((prev) =>
        prev.map((s) => (s.id === seg.id ? { ...s, status: "processing" } : s))
      );

      try {
        const result = await interpretSegment(seg.rawText);
        if (cancelRef.current) break;
        setSegments((prev) =>
          prev.map((s) =>
            s.id === seg.id ? { ...s, interpretedText: result, status: "done" } : s
          )
        );
      } catch (e) {
        console.error(`Segment ${seg.id} failed:`, e);
        setSegments((prev) =>
          prev.map((s) => (s.id === seg.id ? { ...s, status: "error" } : s))
        );
      }
    }

    setProcessingId(null);
    setIsProcessing(false);
  }, []);

  const handleStop = useCallback(() => {
    cancelRef.current = true;
  }, []);

  const sc = statusConfig[modelStatus];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          WebLLM STT Interpreter Demo
        </Typography>
        <Chip label={sc.label} color={sc.color} size="small" />
      </Box>

      <ModelLoader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        status={modelStatus}
        progress={progress}
        progressText={progressText}
        onLoad={handleLoadModel}
        disabled={isProcessing}
      />

      <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRun}
          disabled={modelStatus !== "ready" || isProcessing}
        >
          {isProcessing ? "Processing..." : "Run Interpretation"}
        </Button>
        {isProcessing && (
          <Button variant="outlined" color="error" onClick={handleStop}>
            Stop
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid size={6}>
          <TranscriptPanel segments={segments} processingId={processingId} />
        </Grid>
        <Grid size={6}>
          <ResultPanel segments={segments} processingId={processingId} />
        </Grid>
      </Grid>
    </Container>
  );
}
