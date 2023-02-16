import React from "react";
import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";

export const BtnLocation = () => {
  const { userLocation } = useContext(PlacesContext);
  const { map } = useContext(MapContext);
  const onClick = () => {
    if (!map) throw new Error("Mapa no esta listo");
    if (!userLocation) throw new Error("No hay ubicacion");
    map?.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };
  return (
    <button
      onClick={onClick}
      style={{ position: "fixed", top: 20, right: 20, zIndex: 99 }}
      className="btn btn-primary"
    >
      Mi Ubicacion
    </button>
  );
};
