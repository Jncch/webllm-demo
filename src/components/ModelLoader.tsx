"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
  Alert,
} from "@mui/material";
import type { ModelId } from "@/types";
import { modelOptions } from "@/lib/sample-data";

interface ModelLoaderProps {
  selectedModel: ModelId;
  onModelChange: (modelId: ModelId) => void;
  status: "idle" | "loading" | "ready" | "error";
  progress: number;
  progressText: string;
  onLoad: () => void;
  disabled: boolean;
}

export default function ModelLoader({
  selectedModel,
  onModelChange,
  status,
  progress,
  progressText,
  onLoad,
  disabled,
}: ModelLoaderProps) {
  return (
    <Box
      sx={{
        p: 2.5,
        mb: 3,
        bgcolor: "background.paper",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end", flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 280 }}>
          <InputLabel>Model</InputLabel>
          <Select
            value={selectedModel}
            label="Model"
            onChange={(e) => onModelChange(e.target.value as ModelId)}
            disabled={status === "loading" || disabled}
          >
            {modelOptions.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={onLoad}
          disabled={status === "loading" || status === "ready" || disabled}
        >
          Load Model
        </Button>
      </Box>

      {status === "loading" && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="caption" sx={{ mt: 0.5, display: "block", color: "text.secondary" }}>
            {progressText} ({(progress * 100).toFixed(1)}%)
          </Typography>
        </Box>
      )}

      {status === "idle" && (
        <Alert severity="info" sx={{ mt: 2 }}>
          WebGPU対応ブラウザ（Chrome）が必要です。「Load Model」をクリックしてモデルをダウンロード・初期化してください。
        </Alert>
      )}

      {status === "ready" && (
        <Alert severity="success" sx={{ mt: 2 }}>
          モデルのロードが完了しました。「Run Interpretation」で意訳を開始できます。
        </Alert>
      )}

      {status === "error" && (
        <Alert severity="error" sx={{ mt: 2 }}>
          モデルのロードに失敗しました。WebGPUが利用可能か確認してください。
        </Alert>
      )}
    </Box>
  );
}
