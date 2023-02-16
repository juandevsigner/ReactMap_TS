import { useContext, useState } from "react";
import { PlacesContext, MapContext } from "../context";
import { Feature } from "../interfaces/places";

export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);
  const [activeId, setactiveId] = useState("");

  const onPlaceClicked = (place: Feature) => {
    const [lng, lat] = place.center;
    setactiveId(place.id);
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  const getRoute = (place: Feature) => {
    if (!userLocation) return;
    const [lng, lat] = place.center;
    getRouteBetweenPoints(userLocation, [lng, lat]);
  };

  if (isLoadingPlaces)
    return (
      <p className="text-center p-2 alert mt-2 alert-primary">Buscando...</p>
    );

  if (places.length === 0) return <></>;
  return (
    <ul className="list-group mt-3">
      {places?.map((place) => (
        <li
          onClick={() => onPlaceClicked(place)}
          key={place.id}
          className={`${
            place.id === activeId ? "active" : ""
          } list-group-item list-gropu-item-action pointer`}
        >
          <h6>{place.text_es}</h6>
          <p style={{ fontSize: "12px" }}>{place.place_name}</p>
          <button
            onClick={() => getRoute(place)}
            className={`btn  btn-sm ${
              place.id === activeId
                ? "btn-outline-light"
                : "btn-outline-primary"
            }`}
          >
            RUTA
          </button>
        </li>
      ))}
    </ul>
  );
};
