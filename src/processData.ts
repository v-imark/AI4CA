import { create } from "zustand";
import data from "./twitterDataSample.json";
import { DataEvent, MapOption, StateStore, Warning } from "./enums";

export const ids = data.map((item) => Number(item.id));

export const events: DataEvent[] = data.map((item) => {
  return {
    id: Number(item.id),
    tweet_id: Number(item["tweet-id"]),
    created_at: new Date(item.created_at),
    lang: item.lang,
    author_id: Number(item.author_id),
    text: item.text,
    translatedText: item.translatedText,
    img: item.img,
    geo: item.geo,
    geoparsedGeo: item.geoparsedGeo,
    Prediction: item.Prediction,
    "P (off-topic)": Number(item["P (off-topic)"]),
    "P (on-topic)": Number(item["P (on-topic)"]),
    ggp: Number(item.ggp),
    geometry: item.geometry,
    gp: Number(item.gp),
    lon: Number(item.lon),
    lat: Number(item.lat),
  } as DataEvent;
});

export const Warnings: Warning[] = [
  {
    text: "Kraftigt regn i Gävle, risk för översvämning",
    time: new Date(2021, 7, 17),
  },
  {
    text: "Kraftigt regn i Gävle, risk för översvämning",
    time: new Date(2023, 0, 10),
  },
];

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

export const mapOptions: MapOption[] = [
  {
    label: "Satellite",
    value: "mapbox://styles/mapbox/satellite-v9",
    bright: false,
  },
  { label: "Light", value: "mapbox://styles/mapbox/light-v11", bright: true },
  { label: "Dark", value: "mapbox://styles/mapbox/dark-v11", bright: false },
  {
    label: "Standard",
    value: "mapbox://styles/mapbox/streets-v12",
    bright: true,
  },
  { label: "Temperature", value: "", bright: false },
  { label: "Rainfall", value: "", bright: false },
  { label: "Wind", value: "", bright: false },
];
