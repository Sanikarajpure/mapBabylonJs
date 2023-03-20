import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const Geocoder = ({ setLat, setLng }) => {
  const ctrl = new MapBoxGeocoder({
    accessToken: process.env.REACT_APP_MAPBOX_SECRET,
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    setLng(coords[0]);
    setLat(coords[1]);
  });
  return null;
};

export default Geocoder;
