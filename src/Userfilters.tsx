//import { CheckBox } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";

const allFilters = [
  "Time",
  "Location",
  "Severity",
  "Weather",
  "Temperature",
  "Wind Speed",
  /*
  "Time",
  "Location",
  "Severity",
  "Weather",
  "Temperature",
  "Wind Speed",
  "Time",
  "Location",
  "Severity",
  "Weather",
  "Temperature",
  "Wind Speed",
  "Time",
  "Location",
  "Severity",
  "Weather",
  "Temperature",
  "Wind Speed",
  */
];

var userFilters = ["Time", "Location", "Severity"]; //TODO, make state

function Userfilters() {
  const [optionView, setOptionView] = useState<boolean>(false); //When true, view checkboxes so user can select filters in normal view

  return (
    <Box sx={{ width: "100%", height: "100%", backgroundColor: "darkgray" }}>
      <Box sx={{ height: "10%", display: "flex", justifyContent: "center" }}>
        <Typography>Overlays</Typography>
      </Box>

      <Box sx={{ height: "90%", overflowY: "auto" }}>
        {optionView ? (
          <Box>
            <Typography>Optionview</Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>Filterview</Typography>
            <Box sx={{ postition: "relative"}}>
              {
                //map all filters to checkboxes
                allFilters.map((filter) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "lightgray",
                        borderRadius: "0.2rem",
                        margin: "0.5rem",
                        paddingLeft: "0.5rem",
                      }}
                    >
                      <Typography sx={{}}>{filter}</Typography>
                      <Checkbox></Checkbox>
                    </Box>
                  );
                })
              }
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Userfilters;
