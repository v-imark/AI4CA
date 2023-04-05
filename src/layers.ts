import type { LayerProps } from "react-map-gl";

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "earthquakes",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#fff",
      100,
      "#fff",
      750,
      "#fff",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 80, 30, 730, 40],
    "circle-stroke-width": 6,
    "circle-stroke-color": "#4C86A8",
  },
};

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "earthquakes",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 14,
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "circle",
  source: "earthquakes",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#4C86A8",
    "circle-radius": 6,
    "circle-stroke-width": 2,
    "circle-stroke-color": "#fff",
  },
};
