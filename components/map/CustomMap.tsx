"use client";

import Input from "@/components/Input";
import ReviewCard from "@/components/ReviewCard";
import { NextPage } from "next";
// import { useState } from "react";
import { IconBaseProps } from "react-icons";
import { BiMapAlt, BiSearchAlt } from "react-icons/bi";
import { HiMapPin } from "react-icons/hi2";
import { MapContainer, Popup, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "@/public/map-marker.svg";
import L from "leaflet";
import CustomMarker from "./CustomMarker";

let DefaultIcon = L.icon({
  iconUrl: "map-marker.svg",
  iconSize: [37.5, 61.5],
  iconAnchor: [15, 61.5],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default () => {
  return (
    <MapContainer
      center={[46.017579, 24.872295]}
      zoom={7}
      scrollWheelZoom={false}
      // dragging={false}
      zoomControl={false}
      style={{ height: "700px", width: "900px" }}
    >
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CustomMarker position={[47.0465, 21.9189]} name="Oradea" />
      <CustomMarker position={[45.7489, 21.2087]} name="Timișoara" />
    </MapContainer>
  );
};
