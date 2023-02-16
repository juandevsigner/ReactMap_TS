/* eslint import/no-webpack-loader-syntax: off */

//@ts-ignore
import { Map, Marker } from "!mapbox-gl";
import { MapState } from "./MapProvider";

type MapAction =
  | { type: "SET_MAP"; payload: Map }
  | { type: "SET_MARKES"; payload: Marker[] };

export const mapReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case "SET_MAP":
      return {
        ...state,
        isMapReady: false,
        map: action.payload,
      };
    case "SET_MARKES":
      return {
        ...state,
        markers: action.payload,
      };
    default:
      return state;
  }
};
