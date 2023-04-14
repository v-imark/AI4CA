import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import TweetDisplay from "./TweetDisplay";

import { events } from "./processData"; //Import 1 tweet from the data for testing, TODO remove and use props
import { useEffect, useMemo, useState } from "react";
import { DataEvent, StateStore, StateProps } from "./enums";
import { CheckBox, Person } from "@mui/icons-material";

function InfoPanel(props: StateProps) {
  // Demo data
  const [tweetsInEvent, setTweetsInEvent] = useState<DataEvent[]>([]); //All tweets from one post it
  const [selectedTweet, setSelectedTweet] = useState<DataEvent>(undefined!); //A single tweet to display
  const [postItTitle, setPostItTitle] = useState<String>("");

  useEffect(() => {
    setSelectedTweet(undefined!);
    //change to title of selected post-it
    const newTitle = props.state.selection?.type
      ? props.state.selection.type
      : "";
    setPostItTitle(newTitle);

    //Set tweets to display
    const postIt_ids = props.state.selection?.event_ids
      ? props.state.selection.event_ids
      : [];

    const newData = events.filter((item) =>
      postIt_ids.find((id) => item.id == id)
    );
    setTweetsInEvent(newData);
  }, [props.state.selection]);

  return (
    <Grid
      container
      spacing={2}
      sx={{ height: "100%", width: "100%", margin: 0 }}
    >
      <Grid item xs={6} sx={{ height: "100%", width: "100%", margin: 0 }}>
        <Card>
          <CardHeader title={postItTitle} subheader="September 14, 2016" />
          <CardContent>
            <List
              sx={{
                position: "relative",
                overflow: "auto",
                width: "100%",
                maxHeight: 360,
                margin: 0,
              }}
            >
              <Divider />
              {tweetsInEvent.map((tweet) => (
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      tweet === selectedTweet
                        ? setSelectedTweet(undefined!)
                        : setSelectedTweet(tweet);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "lightSkyBlue" }}>
                        <Person></Person>
                      </Avatar>
                    </ListItemAvatar>

                    {
                      //TODO add improved "selected" behaviour
                      tweet === selectedTweet ? <CheckBox></CheckBox> : <></>
                    }
                    <ListItemText>
                      <Typography variant="body2">
                        {
                          //Split after 20 characters
                          tweet.text.length > 40
                            ? tweet.text.substring(0, 40) + "..."
                            : tweet.text
                        }
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider />
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6} margin={0}>
        <TweetDisplay {...selectedTweet}></TweetDisplay>
      </Grid>
    </Grid>
  );
}
export default InfoPanel;
