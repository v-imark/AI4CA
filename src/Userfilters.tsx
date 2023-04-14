//import { CheckBox } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import {
  Divider,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Slide,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { RefObject, SetStateAction, useEffect, useRef, useState } from "react";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";
import { ArrowRight, CheckRounded, Settings } from "@mui/icons-material";
import FilterIcon from "@mui/icons-material/Filter";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { every } from "d3";
import { MapOption } from "./enums";
import { mapOptions } from "./processData";
import { MapRef } from "react-map-gl";

const allFilters = [
  "Time",
  "Location",
  "Severity",
  "Weather",
  "Temperature",
  "Wind Speed",
];

interface UserfiltersProps {
  mapRef: RefObject<MapRef>;
  contextRef: RefObject<MapRef>;
  setMapIsBright: React.Dispatch<SetStateAction<boolean>>;
}

function Userfilters({ mapRef, contextRef, setMapIsBright }: UserfiltersProps) {
  const [editMode, setEditMode] = useState<boolean>(false); //When true, view checkboxes so user can select filters in normal view
  const [userFilters, setUserFilters] = useState<MapOption[]>([
    mapOptions[0],
    mapOptions[1],
    mapOptions[2],
  ]);

  const [style, setStyle] = useState(mapOptions[2].value);

  //User adds a filter to the list
  const handleChange = (option: MapOption) => {
    if (userFilters.includes(option)) {
      setUserFilters(userFilters.filter((filter) => filter !== option));
    } else {
      setUserFilters([...userFilters, option]);
    }
  };

  const isChecked = (option: MapOption) => {
    return style == option.value;
  };

  const handleSwitch = (option: MapOption) => {
    setStyle(option.value);
    mapRef.current?.getMap().setStyle(option.value as string);
    contextRef.current?.getMap().setStyle(option.value as string);

    if (option.bright) setMapIsBright(true);
    else setMapIsBright(false);
  };

  return (
    <Box sx={{ backgroundColor: "white", height: "100%" }}>
      <List sx={{ position: "relative", maxHeight: "100%" }} disablePadding>
        <ListItem sx={{ display: "flex" }}>
          <ListItemButton disableTouchRipple={true}>
            {editMode ? (
              <>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <Grow in={true}>
                  <Typography variant="h6">Edit</Typography>
                </Grow>
              </>
            ) : (
              <>
                <ListItemIcon>
                  <FilterIcon />
                </ListItemIcon>
                <Grow in={true}>
                  <Typography variant="h6">Options</Typography>
                </Grow>
              </>
            )}
          </ListItemButton>
          <Tooltip title={editMode ? "Save Filters" : "Edit Filters"}>
            <IconButton
              size="large"
              sx={{
                "& svg": {
                  color: "primary",
                  transition: "0.2s",
                  transform: "translateX(0) rotate(0)",
                },
                "&:hover, &:focus": {
                  bgcolor: "unset",
                  "& svg:first-of-type": {
                    transform: "translateX(-4px) rotate(-20deg)",
                  },
                  "& svg:last-of-type": {
                    right: 0,
                    opacity: 1,
                  },
                },
                "&:after": {
                  content: '""',
                  position: "absolute",
                  height: "80%",
                  display: "block",
                  left: 0,
                  width: "1px",
                  bgcolor: "divider",
                },
              }}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? <SaveAsIcon sx={{ color: "green" }} /> : <Settings />}
              <ArrowRight sx={{ position: "absolute", right: 4, opacity: 0 }} />
            </IconButton>
          </Tooltip>
        </ListItem>
        <Divider />
        <ListItem>
          <List
            sx={{
              width: "100%",
              position: "relative",
              overflow: "auto",
              maxHeight: "28vh",
            }}
            disablePadding
          >
            {editMode
              ? mapOptions.map((filter, i) => (
                  <ListItem
                    key={i}
                    secondaryAction={
                      <Checkbox
                        checked={userFilters.includes(filter)}
                        onChange={() => handleChange(filter)}
                      ></Checkbox>
                    }
                  >
                    <ListItemText primary={filter.label} />
                  </ListItem>
                ))
              : userFilters.map((filter, i) => (
                  <ListItem
                    key={i}
                    secondaryAction={
                      <Switch
                        checked={isChecked(filter)}
                        onChange={() => handleSwitch(filter)}
                      ></Switch>
                    }
                  >
                    <ListItemText primary={filter.label} />
                  </ListItem>
                ))}
          </List>
        </ListItem>
      </List>
    </Box>
  );
}

export default Userfilters;
