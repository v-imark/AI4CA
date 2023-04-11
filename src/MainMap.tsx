import { Box, Typography } from "@mui/material";
import { MAPBOX_TOKEN } from "./mapToken";
import { Map, MapRef, Marker, MapboxEvent } from "react-map-gl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDimensions } from "./useDimensions";
import { geoData } from "./processData";
import {
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  Feature,
  BBox,
} from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import useSupercluster from "use-supercluster";
import { theme } from "./theme";
import MapMarker from "./MapMarker";

function MainMap() {
  const divRef = useRef(null);
  const TOKEN = MAPBOX_TOKEN;

  const { width, height } = useDimensions(divRef);

  const [selected, setSelected] = useState(null);

  const mapRef = useRef<MapRef>(null);

  const [viewport, setViewport] = useState({
    latitude: 62.862626,
    longitude: 15.186464,
    zoom: 1,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      mapRef.current?.flyTo({
        center: [15.186464, 62.862626],
        duration: 2000,
        zoom: 3.7,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const bounds = useMemo(() => {
    return mapRef.current
      ? (mapRef.current.getMap().getBounds().toArray().flat() as BBox)
      : undefined;
  }, [viewport]);

  const { clusters, supercluster } = useSupercluster({
    points: geoData,
    bounds: bounds,
    zoom: viewport.zoom,
    options: { radius: 75 },
  });

  const handleClusterClick = (
    event: MapboxEvent<MouseEvent>,
    cluster: any,
    longitude: number,
    latitude: number
  ) => {
    if (selected == cluster.id) {
      setSelected(null);
      return;
    }
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(cluster.id),
      20
    );

    mapRef.current?.flyTo({
      center: [longitude, latitude],
      duration: 2000,
      zoom: expansionZoom - 0.7,
    });

    setSelected(cluster.id);
  };

  const handleClick = (
    event: MapboxEvent<MouseEvent>,
    cluster: any,
    longitude: number,
    latitude: number
  ) => {
    if (selected == cluster.id) {
      setSelected(null);
      return;
    }

    mapRef.current?.flyTo({
      center: [longitude, latitude],
      duration: 2000,
      zoom: viewport.zoom + 0.7,
    });

    setSelected(cluster.id);
  };

  return (
    <div ref={divRef} style={{ width: "100%", height: "100%" }}>
      <Map
        ref={mapRef}
        {...viewport}
        onZoom={(e) => {
          setViewport({
            latitude: e.viewState.latitude,
            longitude: e.viewState.longitude,
            zoom: e.viewState.zoom,
          });
        }}
        onDrag={(e) =>
          setViewport({
            latitude: e.viewState.latitude,
            longitude: e.viewState.longitude,
            zoom: e.viewState.zoom,
          })
        }
        mapStyle="mapbox://styles/mapbox/dark-v9"
        style={{ width: width, height: height }}
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={false}
        interactiveLayerIds={["clusters"]}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          const size = pointCount < 8 ? 60 : 70;
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
                onClick={(event) =>
                  handleClusterClick(event, cluster, longitude, latitude)
                }
              >
                <MapMarker
                  pointCount={pointCount}
                  size={size}
                  isCluster={true}
                  selected={selected == cluster.id}
                />
              </Marker>
            );
          }

          return (
            <Marker
              key={`cluster-${cluster.properties.name}-${longitude}-${latitude}`}
              latitude={latitude}
              longitude={longitude}
              onClick={(event) =>
                handleClick(event, cluster, longitude, latitude)
              }
            >
              <MapMarker
                pointCount={pointCount}
                size={size}
                isCluster={false}
              />
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}

export default MainMap;
