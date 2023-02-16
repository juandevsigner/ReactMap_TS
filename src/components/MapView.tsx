/* eslint import/no-webpack-loader-syntax: off */

import { useContext, useRef, useLayoutEffect } from "react";
//@ts-ignore
import { Map } from "!mapbox-gl";
import { PlacesContext } from "../context/places/PlacesContext";
import { Loading } from "./";
import { MapContext } from "../context/map/MapContext";

export const MapView = () => {
  const { userLocation, isLoading } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!, // container ID
        style: "mapbox://styles/mapbox/dark-v10", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });
      setMap(map);
    }
  }, [isLoading, userLocation]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
      ref={mapDiv}
    >
      {userLocation?.join(",")}
    </div>
  );
};
