import { Box } from "@mui/system";
import { theme } from "./theme";
import { DataEvent, StateProps, StateStore } from "./enums";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import Delete, { DeleteOutlined } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { json } from "d3-fetch";
import { basePostit } from "./PostitGroup";

import { events } from "./processData";

interface PostitProps extends StateProps {
  events: number[];
  indexKey: number;
}

export interface PostitInfo {
  selectedAmount: Number;
  startDate: Date;
  endDate: String;
  avgLong: String;
  avgLat: String;
  avgTemp: number;
  avgWindSpeed: number;
  avgWeather: String;
  daysSinceLastWarning: number;

  nGreenSeverity: number;
  nYellowSeverity: number;
  nRedSeverity: number;
}

function Postit(props: PostitProps): ReactElement {
  const data = useMemo(() => {
    const newData = events.filter((item) =>
      props.events.find((id) => item.id == id)
    );
    return newData;
  }, [props.events]);
  /*
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(
      "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/2/station/91370/period/corrected-archive.json"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.data[0].link[0].href);
        fetch(data.data[0].link[0].href)
          .then((response2) => response2.text())
          .then((data2) => {
            console.log(data2);
          });
        //setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
*/
  function RemoveFromGroup(removeIndex: number) {
    console.log("Remove: " + removeIndex);
  }
  function AddToGroup() {
    console.log("Added");
    // TODO: Check that are values are valid
    props.setState(
      (prev: StateStore) =>
        ({
          postItGroups: [...prev.postItGroups, basePostit],
          data: prev.data,
          selection: prev.selection,
        } as StateStore)
    );
  }

  function CardClick(actionType: number) {
    actionType == 1 ? AddToGroup() : RemoveFromGroup(actionType);
  }

  // Group Information:
  const postitInfo = useMemo(() => {
    const dates = data.map((event) => event.created_at),
      orderedDates = dates.sort(function (a, b) {
        return a > b ? 1 : -1;
      });

    const predictions = data.map((event) => event["P (on-topic)"]);
    const greens = predictions.filter((prediction) => {
      return prediction < 0.6;
    });
    const yellows = predictions.filter((prediction) => {
      return prediction > 0.6 && prediction < 0.9;
    });
    const reds = predictions.filter((prediction) => {
      return prediction > 0.9;
    });

    const longs = data.map((event) => event.lon);
    const lats = data.map((event) => event.lat);
    var longSum = 0;
    var latSum = 0;
    for (var number of longs) {
      longSum += number;
    }
    for (var number of lats) {
      latSum += number;
    }
    const avgLong = (longSum / longs.length).toFixed(4);
    const avgLat = (latSum / lats.length).toFixed(4);

    const temp = Math.random() * 10;
    const windSpeed = (Math.random() + 1) * 2;

    const weathers = ["Sun", "Rain", "Snow", "Cloudy", "Frost", "Strom"];
    const randomWeather =
      weathers[Math.round(Math.random() * (weathers.length - 1))];
    return {
      selectedAmount: data.length,
      startDate: orderedDates[0],
      endDate: orderedDates.reverse()[0],
      avgLong: avgLong,
      avgLat: avgLat,
      avgTemp: temp.toFixed(1),
      avgWindSpeed: windSpeed.toFixed(2),
      avgWeather: randomWeather,
      daysSinceLastWarning: 0,
      nGreenSeverity: greens.length,
      nYellowSeverity: yellows.length,
      nRedSeverity: reds.length,
    };
  }, []);

  // Fetch this variable:
  var currentPostitNumber = 0;

  return (
    <Card
      sx={{
        width: 300,
        minWidth: 300,
        height: "90%",
        margin: 1,
        border: "8px solid #4C86A8",
      }}
    >
      <CardHeader
        avatar={
          <Typography variant="h6" component="div">
            #{currentPostitNumber + 1}
          </Typography>
        }
        action={
          <IconButton
            onClick={() => CardClick(props.indexKey)}
            aria-label="settings"
          >
            {props.indexKey == 1 ? <SaveIcon /> : <DeleteOutlined />}
          </IconButton>
        }
        title={
          <TextField
            hiddenLabel
            fullWidth
            variant="standard"
            id="filled-hidden-label-small"
            placeholder="Test Event Information"
            size="small"
          />
        }
        subheader={"Selected Amount:" + postitInfo.selectedAmount}
      />
      <CardContent>
        <Typography variant="body2">
          Avg Longitude: {postitInfo.avgLong}
        </Typography>

        <Typography variant="body2">
          Avg Latitude: {postitInfo.avgLat}
        </Typography>

        <Typography variant="body2">
          Avg Temperature: {postitInfo.avgTemp}
        </Typography>

        <Typography variant="body2">
          Avg Wind Speed: {postitInfo.avgWindSpeed} m/s
        </Typography>

        <Typography variant="body2">
          Group Start Date: {postitInfo.startDate.toLocaleDateString()}
        </Typography>

        <Typography variant="body2">
          Group End Date: {postitInfo.endDate.toLocaleDateString()}
        </Typography>

        <Typography variant="body2">
          Most Occuring Weather: {postitInfo.avgWeather}
        </Typography>

        <Typography variant="body2">
          Days Since Last Warning Issued: {postitInfo.daysSinceLastWarning}
        </Typography>
      </CardContent>

      <Grid container spacing={0} sx={{ padding: 1 }}>
        <Grid
          item
          xs={12 * (postitInfo.nGreenSeverity / postitInfo.selectedAmount)}
        >
          <LinearProgress
            variant="determinate"
            value={100}
            color="success"
            sx={{
              height: 20,
              borderBottomLeftRadius: 5,
              borderTopLeftRadius: 5,
            }}
          />
          <Typography
            variant="body2"
            align="center"
            position={"relative"}
            marginTop={-2.5}
            zIndex={1}
            sx={{ fontWeight: "bold" }}
          >
            {Math.round(
              (postitInfo.nGreenSeverity / postitInfo.selectedAmount) * 100
            ) + "%"}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12 * (postitInfo.nYellowSeverity / postitInfo.selectedAmount)}
        >
          <LinearProgress
            variant="determinate"
            value={100}
            color="warning"
            sx={{ height: 20 }}
          />
          <Typography
            variant="body2"
            align="center"
            position={"relative"}
            marginTop={-2.5}
            zIndex={1}
            sx={{ fontWeight: "bold" }}
          >
            {Math.round(
              (postitInfo.nYellowSeverity / postitInfo.selectedAmount) * 100
            ) + "%"}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12 * (postitInfo.nRedSeverity / postitInfo.selectedAmount)}
        >
          <LinearProgress
            variant="determinate"
            value={100}
            color="error"
            sx={{
              height: 20,
              borderBottomRightRadius: 5,
              borderTopRightRadius: 5,
            }}
          />
          <Typography
            variant="body2"
            align="center"
            position={"relative"}
            marginTop={-2.5}
            zIndex={1}
            sx={{ fontWeight: "bold" }}
          >
            {100 -
              Math.round(
                (postitInfo.nYellowSeverity / postitInfo.selectedAmount) * 100
              ) -
              Math.round(
                (postitInfo.nGreenSeverity / postitInfo.selectedAmount) * 100
              ) +
              "%"}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Postit;
