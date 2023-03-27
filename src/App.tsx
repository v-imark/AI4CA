import { Box, Grid, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { useState } from "react";
import Postit from "./Postit";
import { Container } from "@mui/system";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={2}
        sx={{height: "100%", width: "100%" }}
      >
        <Grid item xs={5}>
          <Grid
            container
            direction="column"
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
          >
            <Grid item xs={9}></Grid>

            <Grid item xs={3}></Grid>
          </Grid>
        </Grid>

        <Grid item xs={7}>
          
          <Grid
            container
            direction="column"
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
          >
            <Grid item xs={7}></Grid>

            <Grid item xs={5}>
              <Postit events={[]}></Postit>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
