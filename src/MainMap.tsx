import { Box } from "@mui/material";
import { MAPBOX_TOKEN } from "./mapToken";
import { Map, Source, Layer } from "react-map-gl";
import { useRef } from "react";
import { useDimensions } from "./useDimensions";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";
import * as data from "./coordinates.json";
import {
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  Feature,
} from "geojson";

function MainMap() {
  const divRef = useRef(null);
  const TOKEN = MAPBOX_TOKEN;

  const { width, height } = useDimensions(divRef);

  const geoJsonData: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: data.features as Feature<Geometry, GeoJsonProperties>[],
  };

  const coordinates = [
    { latitude: 59.32872, longitude: 18.04752 }, // Stockholm
    { latitude: 59.33424, longitude: 18.05582 }, // Stockholm
    { latitude: 59.32415, longitude: 18.04008 }, // Stockholm
    { latitude: 59.35444, longitude: 18.07174 }, // Stockholm
    { latitude: 59.32982, longitude: 18.04927 }, // Stockholm
    { latitude: 59.27047, longitude: 15.2158 }, // Eskilstuna
    { latitude: 57.70788, longitude: 11.95856 }, // Gothenburg
    { latitude: 57.69564, longitude: 11.95095 }, // Gothenburg
    { latitude: 57.70995, longitude: 11.97435 }, // Gothenburg
    { latitude: 57.6916, longitude: 11.96549 }, // Gothenburg
    { latitude: 55.60708, longitude: 13.0028 }, // Malmö
    { latitude: 55.5968, longitude: 13.00801 }, // Malmö
    { latitude: 55.6103, longitude: 12.99515 }, // Malmö
    { latitude: 55.60351, longitude: 12.99884 }, // Malmö
    { latitude: 59.86221, longitude: 17.62551 }, // Uppsala
    { latitude: 59.86056, longitude: 17.64427 }, // Uppsala
    { latitude: 59.84478, longitude: 17.63336 }, // Uppsala
    { latitude: 59.84478, longitude: 17.62697 }, // Uppsala
    { latitude: 63.82408, longitude: 20.24931 }, // Umeå
    { latitude: 63.82417, longitude: 20.27622 }, // Umeå
  ];

  return (
    <div ref={divRef} style={{ width: "100%", height: "100%" }}>
      <Map
        initialViewState={{
          latitude: 62.862626,
          longitude: 15.186464,
          zoom: 3.7,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        style={{ width: width, height: height }}
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={false}
      >
        <Source
          type="geojson"
          data={geoJsonData}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>

        
      </Map>
    </div>
  );
}

export default MainMap;
