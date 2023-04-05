import { create } from "zustand";
import data from "./twitterDataSample.json";
import { StateStore } from "./enums";

export const ids = data.map((item) => Number(item.id));

export const geoData = data.map((value) => {
  return {
    type: "Feature",
    id: Number(value.id),
    geometry: {
      type: "Point",
      coordinates: [value.lon, value.lat],
    },
    properties: {},
  };
});

export const timeData = data.map((value) => {
  return {
    id: Number(value.id),
    created_at: new Date(value.created_at),
    pred_on_topic: value["P (on-topic)"],
    pred_off_topic: value["P (off-topic)"],
  };
});

export const useBearStore = create<StateStore>((set) => ({
  postItGroups: null,
  data: ids,
  selection: null,
}));
