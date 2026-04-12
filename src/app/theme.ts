"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: {
      default: "#0a1929",
      paper: "#132f4c",
    },
  },
  typography: {
    fontFamily: "'Segoe UI', 'Noto Sans JP', sans-serif",
  },
});

export default theme;
