import { useEffect, useReducer } from "react";
import { searchApi } from "../../apis";
import { getUserLocations } from "../../helpers";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { PlacesResponse, Feature } from "../../interfaces/places";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);
  useEffect(() => {
    getUserLocations().then((lngLat) =>
      dispatch({ type: "SET_USER_LOCATION", payload: lngLat })
    );
  }, []);

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: "SET_PLACES", payload: [] });
      return [];
    }
    if (!state.userLocation) throw new Error("No hay ubicacion del usuario");
    dispatch({ type: "SET_LOADING_PLACES" });

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(","),
      },
    });

    dispatch({ type: "SET_PLACES", payload: resp.data.features });
    return resp.data.features;
  };
  return (
    <PlacesContext.Provider
      value={{
        ...state,
        //METHODS
        searchPlacesByTerm,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
