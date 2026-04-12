"use client";

import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import type { InterpretedSegment } from "@/types";

const speakerColors: Record<string, string> = {
  "Speaker A": "#90caf9",
  "Speaker B": "#f48fb1",
  "Speaker C": "#a5d6a7",
};

interface TranscriptPanelProps {
  segments: InterpretedSegment[];
  processingId: number | null;
}

export default function TranscriptPanel({ segments, processingId }: TranscriptPanelProps) {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 1.5,
          color: "primary.main",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: 700,
        }}
      >
        Raw Transcript (STT Output)
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {segments.map((seg) => {
          const isActive = processingId === seg.id;
          const color = speakerColors[seg.speaker] ?? "#90caf9";
          return (
            <Card
              key={seg.id}
              sx={{
                borderLeft: `3px solid ${isActive ? "#f48fb1" : "transparent"}`,
                boxShadow: isActive ? "0 0 12px rgba(244,143,177,0.15)" : "none",
                transition: "border-color 0.3s, box-shadow 0.3s",
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
                <Typography variant="body2" sx={{ lineHeight: 1.7, color: "text.secondary", wordBreak: "break-word" }}>
                  {seg.rawText}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
