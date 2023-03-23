import { Box } from "@mui/system"
import {theme} from "./theme"
import { Event } from "./enums";
import { Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, LinearProgress, TextField, Typography } from "@mui/material";
import Delete, { DeleteOutlined } from '@mui/icons-material';

type PostitProps = {events: Event[], MapLoc?: String}

const testEvent: Event = {
    time: "15-03-2013",
    location: "Goteborg",
    tweetText: "This is an example text of what could be in a tweet.",
    tweetImage: "Bild",
    severity: 0.6,
};


function Postit(props: PostitProps){
    // One Test event:
    var time = testEvent.time;
    var loc = testEvent.location;
    var text = testEvent.tweetText;
    var img = testEvent.tweetImage;
    var severity = testEvent.severity;

    // Group Information:
    // TODO: Calculates these depending of the Event array
    var selectedAmount = 15;
    var avgLoc = "Göteborg";
    var avgTemp = "14C";
    var avgWindSpeed = 0.3;
    var startDate = time;
    var endDate = time;
    var avgWeather = "Sun";
    var daysSinceLastWarning = 10;

    var nGreenSeverity = 8;
    var nYellowSeverity = 2;
    var nRedSeverity = 5;

    // Fetch this variable:
    var currentPostitNumber = 0;
return (
    <Card sx={{ maxWidth: 300 , margin: 1, border: "8px solid #4C86A8"}} >
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
        subheader={"Selected Amount:" + selectedAmount}
      />
      <CardContent>

        <Typography variant="body2">
          Avg Location: {avgLoc} 
        </Typography>

        <Typography variant="body2">
          Avg Temperature: {avgTemp} 
        </Typography>

        <Typography variant="body2">
          Avg Wind Speed: {avgWindSpeed} m/s
        </Typography>

        <Typography variant="body2">
          Group Start Date: {startDate}
        </Typography>

        <Typography variant="body2">
          Group End Date: {endDate}
        </Typography>

        <Typography variant="body2">
          Most Occuring Weather: {avgWeather}
        </Typography>

        <Typography variant="body2">
          Days Since Last Warning Issued: {daysSinceLastWarning}
        </Typography>

      </CardContent>

      <Grid container spacing={0} sx={{padding: 1}}>

        <Grid item xs={12*(nGreenSeverity/selectedAmount)}>
            
            <LinearProgress variant="determinate" value={100} color="success" sx={{height: 20, borderBottomLeftRadius: 5, borderTopLeftRadius: 5}} />
            <Typography variant="body2" align="center" position={"relative"} marginTop={-2.5} zIndex={1} sx={{fontWeight: "bold"}}>
            {Math.round((nGreenSeverity/selectedAmount)*100) + "%"}
            </Typography>
        </Grid>
        <Grid item xs={12*(nYellowSeverity/selectedAmount)}>
            <LinearProgress variant="determinate" value={100} color="warning" sx={{height: 20}}/>
            <Typography variant="body2" align="center" position={"relative"} marginTop={-2.5} zIndex={1} sx={{fontWeight: "bold"}}>
            {Math.round((nYellowSeverity/selectedAmount)*100) + "%"}
            </Typography>
        </Grid>
        <Grid item xs={12*(nRedSeverity/selectedAmount)}>
            <LinearProgress variant="determinate" value={100} color="error" sx={{height: 20, borderBottomRightRadius: 5, borderTopRightRadius: 5}}/>
            <Typography variant="body2" align="center" position={"relative"} marginTop={-2.5} zIndex={1} sx={{fontWeight: "bold"}}>
            {100 - Math.round((nYellowSeverity/selectedAmount)*100) - Math.round((nGreenSeverity/selectedAmount)*100) + "%"}
            </Typography>
        </Grid>

      </Grid>

    </Card>
    );
}

export default Postit