import { Box, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { useState } from "react";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ backgroundColor: "primary", width: "100%", height: "100%" }}
      ></Box>
    </ThemeProvider>
  );
}

export default App;
