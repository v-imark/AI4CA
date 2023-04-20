import { Box, Grid, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { useEffect, useMemo, useState } from "react";
import Postit from "./Postit";
import { Container } from "@mui/system";

import Timeline from "./Timeline";

import PostitGroup, { basePostit } from "./PostitGroup";
import InfoPanel from "./InfoPanel";

//
import Mapcontainer from "./Mapcontainer";
import { create } from "zustand";
import { events, ids, timeData } from "./processData";
import { StateStore } from "./enums";

function App() {
  const [latestDate, oldestDate] = useMemo(() => {
    const latest = timeData.reduce(function (r, a) {
      return r.created_at > a.created_at ? r : a;
    });
    const oldest = timeData.reduce(function (r, a) {
      return r.created_at < a.created_at ? r : a;
    });

    return [latest.created_at, oldest.created_at];
  }, [timeData]);

  const [dateRange, setDateRange] = useState<[Date, Date]>([
    oldestDate,
    latestDate,
  ]);

  const [state, setState] = useState<StateStore>({
    postItGroups: [],
    data: ids,
    selection: basePostit,
  });

  useEffect(() => {
    console.log(state);
  }, [state.selection]);

  useEffect(() => {
    const newIds: number[] = [];
    for (const item of timeData) {
      if (item?.created_at >= dateRange[0] && item.created_at <= dateRange[1]) {
        newIds.push(item.id);
      }
    }
    setState({
      postItGroups: state.postItGroups,
      data: newIds,
      selection: state.selection,
    });
  }, [dateRange]);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={0}
        sx={{
          height: "100%",
          width: "100%",
          margin: 0,
          paddingLeft: 2,
        }}
      >
        <Grid item xs={5}>
          <Grid
            container
            direction="column"
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
          >
            <Grid item xs={8}>
              <Mapcontainer state={state} setState={setState} />
            </Grid>

            <Grid item xs={4}>
              <Timeline
                state={state}
                setState={setState}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={7} sx={{ paddingLeft: 0 }}>
          <Grid
            container
            direction="column"
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
          >
            <Grid item xs={7} sx={{ width: "100%" }} paddingLeft={0}>
              <InfoPanel state={state} setState={setState}></InfoPanel>
            </Grid>

            <Grid item xs={5} sx={{ width: "100%" }} paddingLeft={0}>
              <PostitGroup state={state} setState={setState}></PostitGroup>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
