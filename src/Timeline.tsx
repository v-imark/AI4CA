import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Slider,
  Stack,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Histogram from "./Histogram";

function Timeline() {
  const data = [1, 2, 2, 3, 4, 5, 6, 6, 6, 9];
  const dates = [
    new Date(2023, 0, 1),
    new Date(2023, 0, 1),
    new Date(2023, 0, 2),
    new Date(2023, 0, 2),
    new Date(2023, 0, 3),
    new Date(2023, 0, 4),
    new Date(2023, 0, 5),
    new Date(2023, 0, 5),
    new Date(2023, 0, 5),
    new Date(2023, 0, 8),
    new Date(2023, 0, 8),
    new Date(2023, 0, 8),
    new Date(2023, 0, 8),
    new Date(2023, 0, 8),
    new Date(2023, 0, 8),
    new Date(2023, 0, 8),
    new Date(2023, 0, 8),
    new Date(2023, 0, 9),
    new Date(2023, 0, 12),
    new Date(2023, 0, 13),
    new Date(2023, 0, 13),
    new Date(2023, 0, 14),
    new Date(2023, 0, 14),
    new Date(2023, 0, 14),
    new Date(2023, 0, 15),
    new Date(2023, 0, 16),
    new Date(2023, 0, 16),
    new Date(2023, 0, 17),
  ];

  const [binSize, setBinSize] = useState(1);

  return (
    <Card sx={{ height: "100%", width: "100%" }}>
      <Grid
        container
        direction="column"
        spacing={0}
        alignItems="center"
        sx={{ height: "100%", width: "100%", margin: 0 }}
      >
        <Grid item xs={2} sx={{ width: "100%" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
            width="100%"
          >
            <Box width={"20%"} marginX={2}>
              <Slider
                value={binSize}
                min={1}
                size="small"
                max={5}
                step={1}
                valueLabelDisplay="auto"
                onChange={(event, value) => setBinSize(value as number)}
              />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={10} sx={{ width: "100%" }}>
          <Histogram dates={dates} binSize={binSize} />
        </Grid>
      </Grid>
    </Card>
  );
}

export default Timeline;
