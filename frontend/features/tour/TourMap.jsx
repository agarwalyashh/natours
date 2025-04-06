import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function TourMap({ location, startLocation }) {
  const position = [startLocation.coordinates[1], startLocation.coordinates[0]];

  return (
    <div className="my-4 mx-auto w-full">
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={true}
        className="h-100 w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={defaultIcon}>
          <Popup>{startLocation.description}</Popup>
        </Marker>
        {location.map((city) => (
          <Marker
            position={[city.coordinates[1], city.coordinates[0]]}
            key={city.id}
            icon={defaultIcon}
          >
            <Popup className="flex gap-2 border-l-4 rounded-lg border-green-600 text-sm">
              <span>{city.description}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default TourMap;
