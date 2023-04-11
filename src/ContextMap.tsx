import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from "geojson";
import { useEffect, useRef, useState } from "react";
import { MAPBOX_TOKEN } from "./mapToken";
import { useDimensions } from "./useDimensions";
import "mapbox-gl/dist/mapbox-gl.css";

import * as data from "./coordinates.json";
import Map, { Layer, Source, Marker } from "react-map-gl";
import { contextclusterLayer, contextunclusteredPointLayer } from "./layers";
import { borderColor } from "@mui/system";
import { ViewPort } from "./enums";

function ContextMap({ viewport, setViewport, mapRef }: ViewPort) {
  const divRef = useRef(null);
  const TOKEN = MAPBOX_TOKEN;

  const { width, height } = useDimensions(divRef);
  const [coordiantes, setCoordinates] = useState({
    longitude: 15.186464,
    latitude: 62.862626,
  });

  useEffect(() => {
    setCoordinates({ longitude: 15.186464, latitude: 62.862626 });
  }, [divRef]);

  const geoJsonData: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: data.features as Feature<Geometry, GeoJsonProperties>[],
  };
  return (
    <div ref={divRef} style={{ width: "100%", height: "100%" }}>
      <Map
        initialViewState={{
          latitude: 62.862626,
          longitude: 15.186464,
          zoom: 2.4,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        style={{ width: width, height: height }}
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={false}
        scrollZoom={false}
        dragPan={false}
      >
        <Source
          type="geojson"
          data={geoJsonData}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={30}
        >
          <Layer {...contextclusterLayer} />
          <Layer {...contextunclusteredPointLayer} />
        </Source>
        <Marker
          latitude={coordiantes.latitude}
          longitude={coordiantes.longitude}
          color="red"
          draggable={true}
          pitchAlignment="map"
          anchor="center"
        >
          <div
            style={{
              width: 50,
              height: 50,
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          ></div>
        </Marker>
      </Map>
    </div>
  );
}

export default ContextMap;
