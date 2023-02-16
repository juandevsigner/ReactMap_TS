import { MapProvider, PlacesProvider } from "./context";
import { HomeScreen } from "./screen";
import "./styles.css";

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PlacesProvider>
  );
};
