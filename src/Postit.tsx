import { Box } from "@mui/system"
import {theme} from "./theme"
import { Event } from "./enums";
import { Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, LinearProgress, TextField, Typography } from "@mui/material";
import Delete, { DeleteOutlined } from '@mui/icons-material';
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { ReactElement, useMemo } from "react";

type PostitProps = {events: Event[], MapLoc?: String}

const testEvents: Event[] = [
  {
    time: new Date(2008, 5, 10),
    location: "Goteborg",
    tweetText: "This is an example text of what could be in a tweet.",
    tweetImage: "Bild",
    severity: 0.6,
  },
  {
    time: new Date(2012, 5, 10),
    location: "Malmo",
    tweetText: "To define an array of objects in TypeScript, a developer must specify the object's type.",
    tweetImage: "Bild",
    severity: 0.2,
  },
  {
    time: new Date(2022, 5, 10),
    location: "Stockholm",
    tweetText: "If you don't plan to re-use the object's type that the array holds, you can define an inline type.",
    tweetImage: "Bild",
    severity: 0.1,
  },
  {
    time: new Date(2003, 4, 10),
    location: "Knivsta",
    tweetText: "Let's see how it works with an example.",
    tweetImage: "Bild",
    severity: 0.9,
  },
]
export interface PostitInfo {
  selectedAmount: Number
  startDate: Date,
  endDate: String,
  avgLoc: String,
  avgTemp: number,
  avgWindSpeed: number,
  avgWeather: String,
  daysSinceLastWarning: number,

  nGreenSeverity: number,
  nYellowSeverity: number,
  nRedSeverity: number,
}

function Postit(props: PostitProps):ReactElement{
    // Group Information:
    const postitInfo = useMemo(()=> {
      const dates = testEvents.map((event) => event.time), 
      orderedDates = dates.sort(function(a,b){
        return a > b ? 1 : -1;
      });
      console.log(orderedDates)

      const severities = testEvents.map((event) => event.severity)
      const greens = severities.filter((severety) => {
        return severety < 0.33
      });
      const yellows = severities.filter((severety) => {
        return severety > 0.33 && severety < 0.66
      });
      const reds = severities.filter((severety) => {
        return severety > 0.66
      });
      
      return {
        selectedAmount: testEvents.length,
        startDate: orderedDates[0],
        endDate: orderedDates.reverse()[0],
        avgLoc: "Undefined",
        avgTemp: 0,
        avgWindSpeed: 0,
        avgWeather: "Undefined",
        daysSinceLastWarning: 0,
        nGreenSeverity: greens.length,
        nYellowSeverity: yellows.length,
        nRedSeverity: reds.length,

      }
    },[testEvents])

    // Fetch this variable:
    var currentPostitNumber = 0;

return (
    <Card sx={{ width: 300, minWidth: 300, height: "90%" , margin: 1, border: "8px solid #4C86A8"}} >
        <CardHeader
        avatar={
            <Typography variant="h6" component="div">
            #{currentPostitNumber + 1}
            </Typography>
        }
        action={
          <IconButton aria-label="settings">
            <DeleteOutlined />
          </IconButton>
        }
        title={<TextField 
            hiddenLabel
            fullWidth
            variant="standard"
            id="filled-hidden-label-small"
            placeholder="Test Event Information"
            size="small"
            />}
        subheader={"Selected Amount:" + postitInfo.selectedAmount}
      />
      <CardContent>

        <Typography variant="body2">
          Avg Location: {postitInfo.avgLoc} 
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

      <Grid container spacing={0} sx={{padding: 1}}>

        <Grid item xs={12*(postitInfo.nGreenSeverity/postitInfo.selectedAmount)}>
            
            <LinearProgress variant="determinate" value={100} color="success" sx={{height: 20, borderBottomLeftRadius: 5, borderTopLeftRadius: 5}} />
            <Typography variant="body2" align="center" position={"relative"} marginTop={-2.5} zIndex={1} sx={{fontWeight: "bold"}}>
            {Math.round((postitInfo.nGreenSeverity/postitInfo.selectedAmount)*100) + "%"}
            </Typography>
        </Grid>
        <Grid item xs={12*(postitInfo.nYellowSeverity/postitInfo.selectedAmount)}>
            <LinearProgress variant="determinate" value={100} color="warning" sx={{height: 20}}/>
            <Typography variant="body2" align="center" position={"relative"} marginTop={-2.5} zIndex={1} sx={{fontWeight: "bold"}}>
            {Math.round((postitInfo.nYellowSeverity/postitInfo.selectedAmount)*100) + "%"}
            </Typography>
        </Grid>
        <Grid item xs={12*(postitInfo.nRedSeverity/postitInfo.selectedAmount)}>
            <LinearProgress variant="determinate" value={100} color="error" sx={{height: 20, borderBottomRightRadius: 5, borderTopRightRadius: 5}}/>
            <Typography variant="body2" align="center" position={"relative"} marginTop={-2.5} zIndex={1} sx={{fontWeight: "bold"}}>
            {100 - Math.round((postitInfo.nYellowSeverity/postitInfo.selectedAmount)*100) - Math.round((postitInfo.nGreenSeverity/postitInfo.selectedAmount)*100) + "%"}
            </Typography>
        </Grid>

      </Grid>

    </Card>
    );
}

export default Postit