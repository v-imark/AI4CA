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
} from "react-map-gl";
import { contextclusterLayer, contextunclusteredPointLayer } from "./layers";
import { borderColor } from "@mui/system";
import { ViewPort } from "./enums";
import MapMarker from "./MapMarker";
import { geoData } from "./processData";
import useSupercluster from "use-supercluster";

function ContextMap({ viewport, setViewport, mapRef }: ViewPort) {
  const divRef = useRef(null);

  const { width, height } = useDimensions(divRef);
  const [coordiantes, setCoordinates] = useState({
    longitude: 15.186464,
    latitude: 62.862626,
  });

  const widthAndHeight = useMemo(() => {
    const width = mapRef.current
      ? mapRef.current?.getMap().getContainer().offsetWidth
      : 50;
    const height = mapRef.current
      ? mapRef.current?.getMap().getContainer().offsetHeight
      : 50;
    return { width, height };
  }, [viewport]);

  useEffect(() => {
    setCoordinates({ longitude: 15.186464, latitude: 62.862626 });
  }, [divRef]);

  // Marker states:
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));
    console.log(viewport.zoom);
    const zoom = mapRef.current ? mapRef.current?.getZoom() : 3.7;
    setViewport({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      zoom: zoom,
    });
  }, []);

  const geoJsonData: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: data.features as Feature<Geometry, GeoJsonProperties>[],
  };

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
        interactiveLayerIds={["clusters"]}
      >
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
              >
                <MapMarker pointCount={""} size={size} isCluster={true} />
              </Marker>
            );
          }

          return (
            <Marker
              key={`cluster-${cluster.properties.name}-${longitude}-${latitude}`}
              latitude={latitude}
              longitude={longitude}
            >
              <MapMarker
                pointCount={pointCount}
                size={size}
                isCluster={false}
              />
            </Marker>
          );
        })}

        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          color="red"
          draggable={true}
          onDrag={onMarkerDrag}
          pitchAlignment="map"
          anchor="center"
        >
          <div
            style={{
              width: (widthAndHeight.width * 6) / Math.pow(2, viewport.zoom),
              height: (widthAndHeight.height * 6) / Math.pow(2, viewport.zoom),
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
