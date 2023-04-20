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
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import TweetDisplay from "./TweetDisplay";

import { events } from "./processData"; //Import 1 tweet from the data for testing, TODO remove and use props
import { useEffect, useMemo, useState } from "react";
import { DataEvent, StateStore, StateProps } from "./enums";
import { CheckBox, North, Person, Sort, South } from "@mui/icons-material";

function InfoPanel(props: StateProps) {
  // Demo data
  const [tweetsInEvent, setTweetsInEvent] = useState<DataEvent[]>([]); //All tweets from one post it
  const [selectedTweet, setSelectedTweet] = useState<DataEvent>(undefined!); //A single tweet to display
  const [postItTitle, setPostItTitle] = useState<String>("");

  const [sorting, setSorting] = useState<String>("");
  const [ascDesc, setAscDesc] = useState<String>("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openSorting = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeSorting = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const data = useMemo(() => {
    if (selectedTweet === undefined) setSelectedTweet(undefined!);

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

    if (sorting == "Time") {
      const sortedData = newData.sort(
        (a, b) => b.created_at.getTime() - a.created_at.getTime()
      );
      if (ascDesc == "ASC") return sortedData.reverse();
      return sortedData;
    }

    if (sorting == "On-Topic") {
      const sortedData = newData.sort(
        (a, b) => b["P (on-topic)"] - a["P (on-topic)"]
      );
      if (ascDesc == "ASC") return sortedData.reverse();
      return sortedData;
    }

    return newData;
  }, [ascDesc, sorting, props.state.selection]);

  return (
    <Grid
      container
      columnSpacing={2}
      sx={{ height: "100%", width: "100%", margin: 0, paddingLeft: 0 }}
    >
      <Grid
        item
        xs={6}
        sx={{ height: "100%", width: "100%", margin: 0, paddingLeft: 0 }}
      >
        <Card sx={{ height: "100%" }}>
          <CardHeader
            title={postItTitle}
            subheader="September 14, 2016"
            action={
              <>
                <ToggleButtonGroup
                  value={ascDesc}
                  size="small"
                  exclusive
                  onChange={(event, value) => setAscDesc(value)}
                  sx={{ marginRight: 1, marginTop: 2 }}
                >
                  <ToggleButton value="ASC">
                    <North />
                  </ToggleButton>
                  <ToggleButton value="DESC">
                    <South />
                  </ToggleButton>
                </ToggleButtonGroup>
                <IconButton
                  aria-label="filter"
                  onClick={openSorting}
                  sx={{ marginTop: -2 }}
                >
                  <Sort />
                </IconButton>
              </>
            }
          />
          <Menu anchorEl={anchorEl} open={open} onClose={closeSorting}>
            <MenuItem
              selected={sorting === "Time"}
              onClick={() => {
                setSorting("Time");
                closeSorting();
              }}
            >
              Time
            </MenuItem>
            <MenuItem
              selected={sorting === "On-Topic"}
              onClick={() => {
                setSorting("On-Topic");
                closeSorting();
              }}
            >
              On-Topic
            </MenuItem>
          </Menu>
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
              {data.map((tweet, i) => (
                <ListItem key={tweet.id * i}>
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
