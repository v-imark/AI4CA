import { Box, Grid, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { useState } from "react";
import Postit from "./Postit";
import { Container } from "@mui/system";
import PostitGroup from "./PostitGroup";
import InfoPanel from "./InfoPanel";

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
            <Grid item xs={7} sx={{width: "100%"}}>
              <InfoPanel></InfoPanel>
            </Grid>
              
            <Grid item xs={5} sx={{width: "100%"}}>
              <PostitGroup></PostitGroup>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
