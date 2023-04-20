import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

import { Person, Translate } from "@mui/icons-material";

//TODO: if tweet is translated and event is changed to an english tweet, the togglebuttons may have unwanted behaviour

//Twitter theme
const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: "Ubuntu",
        //Anti-alias font
        sx: {
          WebkitFontSmoothing: "antialiased",
        },
      },
      styleOverrides: {
        h5: {
          color: "black",
          fontWeight: "bold",
        },
        h6: {
          color: "gray",
          fontSize: "1rem",
          fontWeight: "normal",
        },
        body2: {
          fontWeight: "500",
          fontSize: "1.2rem",
        },
      },
    },
  },
});

import { DataEvent } from "./enums";

function TweetDisplay(event: DataEvent) {
  //No tweet selected
  if (event.id === null || event.id == undefined) {
    return (
      <Card
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Select a tweet to display</Typography>
      </Card>
    );
  }

  var tweet = event; //import 1 tweet, TODO remove and use props
  //Format time to display
  const time = tweet.created_at;
  const timeString = time.toLocaleTimeString(undefined, {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
  });
  const dateString = time.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  //Toggle view translated text
  const [translated, setTranslated] = useState<Boolean>(false);
  const handleTranslate = (
    event: React.MouseEvent<HTMLElement>,
    newSetting: Boolean | null
  ) => {
    if (newSetting !== null) {
      setTranslated(newSetting);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ width: "100%", height: "100%" }}>
        <CardMedia
          component="img"
          height="140"
          image="/src/Skyfallet-arsdag.jpg"
          alt="Blue eyes"
        />
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "lightSkyBlue" }}>
              <Person></Person>
            </Avatar>
          }
          title={
            <Tooltip title={"id: " + tweet.author_id} placement="bottom">
              <Typography variant="h5">Twitter user</Typography>
            </Tooltip>
          }
          subheader={
            <Tooltip title={"id: " + tweet.author_id} placement="bottom">
              <Typography variant="h6">@TwitterHandle</Typography>
            </Tooltip>
          }
          action={
            <ToggleButtonGroup
              value={translated}
              exclusive
              onChange={handleTranslate}
            >
              <Tooltip title="View original language">
                <ToggleButton value={false} selected={!translated}>
                  <Typography>{tweet.lang}</Typography>
                </ToggleButton>
              </Tooltip>
              {tweet.lang !== "en" ? (
                <Tooltip title="Translate to english">
                  <ToggleButton value={true} selected={!!translated}>
                    <Translate></Translate>
                  </ToggleButton>
                </Tooltip>
              ) : (
                <ToggleButton value={true} selected={!!translated} disabled>
                  <Translate></Translate>
                </ToggleButton>
              )}
            </ToggleButtonGroup>
          }
        ></CardHeader>
        <CardContent sx={{ height: 200, overflow: "auto" }}>
          <Typography variant="body2">
            {translated ? tweet.translatedText : tweet.text}
          </Typography>
          <Typography paddingY={2}>
            {timeString} &#x2022; {dateString}
          </Typography>
          <Typography>{tweet["P (on-topic)"] + " On-Topic"}</Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default TweetDisplay;
