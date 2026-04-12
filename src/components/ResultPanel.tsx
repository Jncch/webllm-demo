"use client";

import { Box, Card, CardContent, Chip, CircularProgress, Typography } from "@mui/material";
import type { InterpretedSegment } from "@/types";

const speakerColors: Record<string, string> = {
  "Speaker A": "#90caf9",
  "Speaker B": "#f48fb1",
  "Speaker C": "#a5d6a7",
};

interface ResultPanelProps {
  segments: InterpretedSegment[];
  processingId: number | null;
}

export default function ResultPanel({ segments, processingId }: ResultPanelProps) {
  const completedSegments = segments.filter((s) => s.status === "done");
  const processingSegment = segments.find((s) => s.id === processingId);

  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 1.5,
          color: "secondary.main",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: 700,
        }}
      >
        Interpreted Output
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {completedSegments.map((seg) => {
          const color = speakerColors[seg.speaker] ?? "#90caf9";
          return (
            <Card
              key={seg.id}
              sx={{
                borderLeft: `3px solid ${color}`,
                animation: "fadeIn 0.4s ease",
                "@keyframes fadeIn": {
                  from: { opacity: 0, transform: "translateY(8px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                  <Chip
                    label={seg.speaker}
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: color, color }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {seg.timestamp}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ lineHeight: 1.7, wordBreak: "break-word" }}>
                  {seg.interpretedText}
                </Typography>
              </CardContent>
            </Card>
          );
        })}

        {processingSegment && (
          <Card>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.5, "&:last-child": { pb: 1.5 } }}>
              <CircularProgress size={20} color="secondary" />
              <Typography variant="body2" color="text.secondary">
                Interpreting segment {processingSegment.id}...
              </Typography>
            </CardContent>
          </Card>
        )}

        {completedSegments.length === 0 && !processingSegment && (
          <Card>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                モデルをロードし「Run Interpretation」をクリックして開始
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}
