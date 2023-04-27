"use client";

import { MapContainer, Popup, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CustomMarker from "./CustomMarker";
import { COORDINATES_ROMANIA_CENTER } from "@/common/Constants";

let DefaultIcon = L.icon({
  iconUrl: "map-marker.svg",
  iconSize: [37.5, 61.5],
  iconAnchor: [15, 61.5],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface CustomMapProps {
  locations: any[];
}

export default ({ locations }: CustomMapProps) => {
  return (
    <div className="h-[374px] md:h-[561px] w-[1000px]">
      <MapContainer
        center={COORDINATES_ROMANIA_CENTER}
        zoom={6}
        // scrollWheelZoom={false}
        // dragging={false}
        // zoomControl={false}
        style={{
          minHeight: "100%",
          height: "100%",
          minWidth: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location, index) => (
          <CustomMarker
            key={index}
            position={location.position}
            id={location._id}
            name={location.name}
          />
        ))}
      </MapContainer>
    </div>
  );
};
