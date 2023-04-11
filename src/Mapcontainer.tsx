import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import ContextMap from "./ContextMap";
import MainMap from "./MainMap";

//
import Userfilters from "./Userfilters";
import { useRef, useState } from "react";
import { MapRef } from "react-map-gl";



function Mapcontainer() {
  const mapRef = useRef<MapRef>(null);
  const [viewport, setViewport] = useState({
    latitude: 62.862626,
    longitude: 15.186464,
    zoom: 1,
  });
  
  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "darkblue",
        display: "flex",
        margin: 0,
        padding: 0,
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "30%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ height: "40%", width: "100%"}}>
          <ContextMap viewport={viewport} setViewport={setViewport} mapRef={mapRef}/>
        </Box>
        <Box sx={{ height: "60%", width: "100%" }}>
          <Userfilters></Userfilters>
        </Box>
      </Box>

      <Box sx={{ width: "70%", backgroundColor: "lightgray" }}>
        <MainMap viewport={viewport} setViewport={setViewport} mapRef={mapRef} />
      </Box>
    </Card>
  );
}

export default Mapcontainer;
