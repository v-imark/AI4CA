import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import ContextMap from "./ContextMap";
import MainMap from "./MainMap";

//
import Userfilters from "./Userfilters";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { MapRef } from "react-map-gl";
import { geoData } from "./processData";
import { StateProps, StateStore } from "./enums";
import useSupercluster from "use-supercluster";
import { BBox } from "geojson";

function Mapcontainer(props: StateProps) {
  const data = useMemo(() => {
    const newData = geoData.filter((item) =>
      props.state.data.find((id) => item.id == id)
    );
    return newData;
  }, [props.state.data]);

  const [mapIsBright, setMapIsBright] = useState(false);

  const mapRef = useRef<MapRef>(null);
  const contextRef = useRef<MapRef>(null);
  const [viewport, setViewport] = useState({
    latitude: 62.862626,
    longitude: 15.186464,
    zoom: 1,
  });

  const bounds = useMemo(() => {
    return mapRef.current
      ? (mapRef.current.getMap().getBounds().toArray().flat() as BBox)
      : undefined;
  }, [viewport]);

  const contextBounds = useMemo(() => {
    return contextRef.current
      ? (contextRef.current.getMap().getBounds().toArray().flat() as BBox)
      : undefined;
  }, [viewport]);

  const { clusters, supercluster } = useSupercluster({
    points: data,
    bounds: bounds,
    zoom: viewport.zoom,
    options: { radius: 75 },
  });

  const contextClusters = useSupercluster({
    points: data,
    bounds: contextBounds,
    zoom: viewport.zoom,
    options: { radius: 75 },
  });

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "white",
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
        <Box sx={{ height: "40%", width: "100%" }}>
          <ContextMap
            viewport={viewport}
            setViewport={setViewport}
            mapRef={mapRef}
            data={data}
            clusters={contextClusters.clusters}
            contextRef={contextRef}
            mapIsBright={mapIsBright}
          />
        </Box>
        <Box sx={{ height: "60%", width: "100%" }}>
          <Userfilters
            mapRef={mapRef}
            contextRef={contextRef}
            setMapIsBright={setMapIsBright}
          />
        </Box>
      </Box>

      <Box sx={{ width: "70%", backgroundColor: "lightgray" }}>
        <MainMap
          viewport={viewport}
          setViewport={setViewport}
          mapRef={mapRef}
          data={data}
          clusters={clusters}
          supercluster={supercluster}
          state={props.state}
          setState={props.setState}
        />
      </Box>
    </Card>
  );
}

export default Mapcontainer;
