import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

export function Map({ latitude, longitude, location }) {
  function ChangeView({ lat, lng }) {
    const map = useMap();
    useEffect(() => {
      if (!lat || !lng) return;
      map.setView([lat, lng], map.getZoom());
    }, [lat, lng, map]);
    return null;
  }

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <ChangeView lat={latitude} lng={longitude} />

      <Marker position={[latitude, longitude]}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
}
