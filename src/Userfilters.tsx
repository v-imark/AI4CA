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
import { useEffect, useRef, useState } from "react";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";
import { ArrowRight, CheckRounded, Settings } from "@mui/icons-material";
import FilterIcon from "@mui/icons-material/Filter";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { every } from "d3";

const allFilters = [
  "Time",
  "Location",
  "Severity",
  "Weather",
  "Temperature",
  "Wind Speed",
];

function Userfilters() {
  const [editMode, setEditMode] = useState<boolean>(false); //When true, view checkboxes so user can select filters in normal view
  const [userFilters, setUserFilters] = useState<string[]>([
    "Time",
    "Location",
    "Severity",
  ]);

  //User adds a filter to the list
  const handleChange = (event: string) => {
    if (userFilters.includes(event)) {
      setUserFilters(userFilters.filter((filter) => filter !== event));
    } else {
      setUserFilters([...userFilters, event]);
    }
    //console.log(event);
    //console.log(userFilters);
  };

  useEffect(() => {
    //console.log("userFilters changed");
  }, [userFilters]);

  useEffect(() => {}, [editMode]);

  return (
    <Box sx={{ backgroundColor: "darkred", height: "100%" }}>
      <Paper>
        <List sx={{ position: "relative" }} disablePadding>
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
                    <Typography variant="h6">Filters</Typography>
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
                {editMode ? (
                  <SaveAsIcon sx={{ color: "green" }} />
                ) : (
                  <Settings />
                )}
                <ArrowRight
                  sx={{ position: "absolute", right: 4, opacity: 0 }}
                />
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
                maxHeight: "360px",
              }}
              disablePadding
            >
              {editMode
                ? allFilters.map((filter) => (
                    <ListItem
                      key={filter}
                      secondaryAction={
                        <Checkbox
                          checked={userFilters.includes(filter)}
                          onChange={() => handleChange(filter)}
                        ></Checkbox>
                      }
                    >
                      <ListItemText primary={filter} />
                    </ListItem>
                  ))
                : userFilters.map((filter) => (
                    <ListItem
                      key={filter}
                      secondaryAction={<Switch checked={true}></Switch>}
                    >
                      <ListItemText primary={filter} />
                    </ListItem>
                  ))}
            </List>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}

export default Userfilters;
