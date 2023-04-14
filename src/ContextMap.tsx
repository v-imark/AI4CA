import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
  BBox,
} from "geojson";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MAPBOX_TOKEN } from "./mapToken";
import { useDimensions } from "./useDimensions";
import "mapbox-gl/dist/mapbox-gl.css";
import * as data from "./coordinates.json";
import Map, {
  Layer,
  Source,
  Marker,
  LngLat,
  MarkerDragEvent,
  MapRef,
  MapboxEvent,
  MapWheelEvent,
} from "react-map-gl";
import { contextclusterLayer, contextunclusteredPointLayer } from "./layers";
import { borderColor } from "@mui/system";
import { ViewPort } from "./enums";
import MapMarker from "./MapMarker";
import { geoData, mapOptions } from "./processData";
import useSupercluster from "use-supercluster";
import { ContentCutSharp } from "@mui/icons-material";

interface ContextMapProps extends ViewPort {
  mapIsBright: boolean;
}

function ContextMap({
  viewport,
  setViewport,
  mapRef,
  clusters,
  contextRef,
  mapIsBright,
}: ContextMapProps) {
  const divRef = useRef(null);

  const { width, height } = useDimensions(divRef);

  const widthAndHeight = useMemo(() => {
    const width = mapRef.current
      ? mapRef.current?.getMap().getContainer().offsetWidth
      : 50;
    const height = mapRef.current
      ? mapRef.current?.getMap().getContainer().offsetHeight
      : 50;
    return { width, height };
  }, [viewport]);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    const zoom = mapRef.current ? mapRef.current?.getZoom() : 3.7;
    setViewport({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      zoom: zoom,
    });
  }, []);

  const onWheel = useCallback((event: MapWheelEvent) => {
    const zoom = mapRef.current ? mapRef.current?.getZoom() : 3.7;
    const lnglat = mapRef.current
      ? mapRef.current?.getMap().getCenter()
      : { lng: viewport.longitude, lat: viewport.latitude };
    setViewport({
      longitude: lnglat.lng,
      latitude: lnglat.lat,
      zoom: zoom - event.originalEvent.deltaY / 500,
    });
  }, []);

  return (
    <div ref={divRef} style={{ width: "100%", height: "100%" }}>
      <Map
        ref={contextRef}
        initialViewState={{
          latitude: 62.862626,
          longitude: 15.186464,
          zoom: 2.4,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={false}
        scrollZoom={false}
        dragPan={false}
        interactiveLayerIds={["clusters"]}
        onWheel={onWheel}
      >
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          color="red"
          draggable={true}
          onDrag={onMarkerDrag}
          pitchAlignment="map"
          anchor="center"
          style={{ zIndex: 1 }}
        >
          <div
            style={{
              width: (widthAndHeight.width * 6) / Math.pow(2, viewport.zoom),
              height: (widthAndHeight.height * 6) / Math.pow(2, viewport.zoom),
              backgroundColor: "rgba(255,255,255,0.1)",
              border: mapIsBright
                ? "1px solid rgba(0,0,0,0.5)"
                : "1px solid rgba(255,255,255,0.5)",
            }}
          ></div>
        </Marker>
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          const size = pointCount < 8 ? 25 : 35;
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
                clickTolerance={0}
              >
                <MapMarker
                  pointCount={""}
                  size={size}
                  isCluster={true}
                  isContext={true}
                />
              </Marker>
            );
          }

          return (
            <Marker
              key={`cluster-${cluster.properties.name}-${longitude}-${latitude}`}
              latitude={latitude}
              longitude={longitude}
              clickTolerance={0}
            >
              <MapMarker
                pointCount={pointCount}
                size={size}
                isCluster={false}
                isContext={true}
              />
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}

export default ContextMap;
