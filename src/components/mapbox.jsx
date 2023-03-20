import React, { useState, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import Geocoder from "./geocoder";
import SceneWithSpinningBoxes from "./babylonCuboid";

const Mapbox = () => {
  const [lng, setLng] = useState(73.8567);
  const [lat, setLat] = useState(18.5204);
  const [cuboid, setCuboid] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const mapRef = useRef(null);
  const key = `pk.eyJ1Ijoic2FuaWthcmFqcHVyZSIsImEiOiJjbGZjajY0aXQydWplNDFvMTl0aWZ4ZXA3In0.Ler5fYlCe0AJM1S7hfeWcQ`;

  const getImg = () => {
    var png = mapRef.current.getCanvas().toDataURL();
    setImgUrl(png);

    console.log(png);
    setCuboid(true);
  };

  return (
    <div>
      {cuboid ? (
        <>
          <div className="cuboidContainer">
            <SceneWithSpinningBoxes imgUrl={imgUrl} />
          </div>
        </>
      ) : (
        <>
          <div className="mapContainer">
            <div>
              <Map
                ref={mapRef}
                mapboxAccessToken={key}
                style={{
                  width: "80vw",
                  height: "60vh",
                  borderRadius: "15px",
                }}
                initialViewState={{
                  longitude: lng,
                  latitude: lat,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                preserveDrawingBuffer
              >
                <NavigationControl position="bottom-right" />
                <FullscreenControl />
                <GeolocateControl />
                <Geocoder
                  setLat={(val) => {
                    setLat(val);
                  }}
                  setLng={(val) => {
                    setLng(val);
                  }}
                />
              </Map>
            </div>
            <div>
              <button
                className="convertBtn"
                onClick={() => {
                  getImg();
                }}
              >
                Convert to 3D
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Mapbox;
