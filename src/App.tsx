import { Box, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { useState } from "react";
import Postit from "./Postit";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Postit events={[]}></Postit>
      <Box
        sx={{ backgroundColor: "primary", width: "100%", height: "100%" }}
      ></Box>
      
    </ThemeProvider>
  );
}

export default App;
