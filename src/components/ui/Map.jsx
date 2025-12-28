import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

export function Map({ latitude, longitude, location }) {
  function ChangeView({ lat, lng }) {
    const map = useMap();
    useEffect(() => {
      if (lat && lng) map.setView([lat, lng], 15);
    }, [lat, lng, map]);
    return null;
  }

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer
        url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
        attribution="Google Maps Hybrid"
      />

      <ChangeView lat={latitude} lng={longitude} />

      <Marker position={[latitude, longitude]}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
}
