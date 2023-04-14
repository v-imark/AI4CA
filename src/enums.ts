import { MapRef } from "react-map-gl";
import { BBox } from "geojson";
export interface DataEvent {
  id: number;
  tweet_id: number;
  created_at: Date;
  lang: String;
  author_id: number;
  text: String;
  translatedText: String;
  img: String;
  geo: String;
  geoparsedGeo: String;
  Prediction: String;
  "P (off-topic)": number;
  "P (on-topic)": number;
  ggp: number;
  geometry: String;
  gp: number;
  lon: number;
  lat: number;
}

export interface ViewPort {
  viewport: { latitude: number; longitude: number; zoom: number };
  mapRef: React.RefObject<MapRef>;
  setViewport: ({
    latitude,
    longitude,
    zoom,
  }: {
    latitude: number;
    longitude: number;
    zoom: number;
  }) => void;
  data: {
    type: string;
    id: number;
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: {};
  }[];
  clusters: any[];
  supercluster?: any;
  contextRef?: React.RefObject<MapRef>;
}

export interface DataSelection {
  type: String;
  selection: DataEvent[];
  closesWarning: String;
}

export interface Warning {
  text: String;
  time: Date;
}

export interface PostIt {
  type: String;
  post_it_id: number;
  event_ids: number[];
}

export interface StateStore {
  postItGroups: PostIt[];
  data: number[];
  selection: PostIt | undefined;
}

export interface StateProps {
  state: StateStore;
  setState: React.Dispatch<React.SetStateAction<StateStore>>;
}

export interface MapOption {
  label: String;
  value: String;
  bright: boolean;
}
