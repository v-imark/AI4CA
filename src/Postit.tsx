import { Box } from "@mui/system";
import { theme } from "./theme";
import { DataEvent, PostIt, StateProps, StateStore } from "./enums";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import Delete, { BorderColor, DeleteOutlined } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { json } from "d3-fetch";
import { basePostit } from "./PostitGroup";

import { events } from "./processData";
import { selection } from "d3";

interface PostitProps extends StateProps {
  events: PostIt;
  indexKey: number;
  selected: boolean;
}

export interface PostitInfo {
  postitName: String;
  selectedAmount: Number;
  startDate: Date;
  endDate: String;
  avgLong: String;
  avgLat: String;
  avgTemp: number;
  avgWindSpeed: number;
  avgWeather: String;
  //daysSinceLastWarning: number;

  nGreenSeverity: number;
  nYellowSeverity: number;
  nRedSeverity: number;
}

function Postit(props: PostitProps): ReactElement {
  const [postName, setPostName] = useState(props.events.type);

  const data = useMemo(() => {
    setPostName(props.events.type);
    const newData = events.filter((item) =>
      props.events.event_ids.find((id) => item.id == id)
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
    const idToRemove = props.state.postItGroups[removeIndex - 2].post_it_id;
    console.log("Remove: " + removeIndex + " With id: " + idToRemove);
    props.setState(
      (prev: StateStore) =>
        ({
          postItGroups: prev.postItGroups.filter((postit) => {
            console.log(postit.post_it_id);
            return postit.post_it_id != idToRemove;
          }),
          data: prev.data,
          selection: prev.selection,
        } as StateStore)
    );
  }
  function AddToGroup() {
    console.log("Added");
    // TODO: Check that are values are valid

    props.setState((prev: StateStore) => {
      const newPostit = {
        type: postName,
        post_it_id: new Date().getTime(),
        event_ids: prev.selection?.event_ids,
      };
      console.log("The new id is:" + newPostit.post_it_id);
      return {
        postItGroups: [...prev.postItGroups, newPostit],
        data: prev.data,
        selection: prev.selection,
      } as StateStore;
    });
    console.log(props.state.postItGroups);
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
    const latest = dates.reduce(function (r, a) {
      return r > a ? r : a;
    });
    const oldest = dates.reduce(function (r, a) {
      return r < a ? r : a;
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

    const randTemp = Math.random() * 10;
    const windSpeed = (Math.random() + 1) * 2;

    const weathers = ["Sun", "Rain", "Snow", "Cloudy", "Frost", "Strom"];
    const randomWeather =
      weathers[Math.round(Math.random() * (weathers.length - 1))];
    const nAmount = data.length;

    const nameOfPostit = props.events.type + " Group";
    return {
      postitName: nameOfPostit,
      selectedAmount: nAmount,
      startDate: oldest,
      endDate: latest,
      avgLong: avgLong,
      avgLat: avgLat,
      avgTemp: randTemp.toFixed(1),
      avgWindSpeed: windSpeed.toFixed(2),
      avgWeather: randomWeather,
      //daysSinceLastWarning: 0,
      nGreenSeverity: greens.length,
      nYellowSeverity: yellows.length,
      nRedSeverity: reds.length,
    };
  }, [props.events]);

  const customBorder = {
    borderColor:
      props.selected == true
        ? "8px solid " + theme.palette.primary.main
        : "8px solid white",
  };

  function SelectPostit() {
    console.log("Bingo");
    console.log(postName);
    const Postit: PostIt = {
      type: postName,
      post_it_id: props.events.post_it_id,
      event_ids: props.events.event_ids,
    };
    props.setState((prev: StateStore) => {
      return {
        postItGroups: prev.postItGroups,
        data: prev.data,
        selection: Postit,
      } as StateStore;
    });
  }

  return (
    <Card
      sx={{
        width: 300,
        minWidth: 300,
        height: "90%",
        margin: 1,
        border: customBorder.borderColor,
      }}
    >
      <CardHeader
        avatar={
          <Typography variant="h6" component="div">
            #{props.indexKey}
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
            value={postName}
            onChange={(e) => {
              setPostName(e.target.value);
            }}
            size="small"
          />
        }
        subheader={"Selected Amount:" + postitInfo.selectedAmount}
      />
      <CardActionArea onClick={SelectPostit}>
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

          {/*<Typography variant="body2">
            Days Since Last Warning Issued: {postitInfo.daysSinceLastWarning}
          </Typography>*/}
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
            {/*<Typography
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
            </Typography>*/}
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
            {/*<Typography
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
              </Typography>*/}
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
            {/*<Typography
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
            </Typography>*/}
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

export default Postit;
