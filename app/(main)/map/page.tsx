"use client";

import Input from "@/components/Input";
import ReviewCard from "@/components/ReviewCard";
import { NextPage } from "next";
// import { useState } from "react";
import { IconBaseProps } from "react-icons";
import { BiMapAlt, BiSearchAlt } from "react-icons/bi";
import { HiMapPin } from "react-icons/hi2";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "@/public/map-marker.svg";
import L from "leaflet";
import CustomMap from "@/components/map/CustomMap";

let DefaultIcon = L.icon({
  iconUrl: "map-marker.svg",
  iconSize: [37.5, 61.5],
  iconAnchor: [15, 61.5],
});
L.Marker.prototype.options.icon = DefaultIcon;

const Reviews: NextPage = () => {
  return (
    <div className="flex flex-col xl:flex-row items-start justify-center bg-background p-6 md:p-10 lg:p-14">
      {/* <FaMapMarkerAlt /> */}
      <div className="flex flex-col gap-6 pb-4 xl:pb-0">
        <div className="flex gap-4">
          <BiMapAlt className="w-9 h-9" />
          <h1 className=" text-4xl font-medium">Hartă</h1>
        </div>
        <p className=" max-w-lg">
          Aici aveți o hartă interactivă a marilor orașe din România. Fiecare
          oraș are un marcaj distinctiv Selectează un marcaj pentru a vedea
          universitățile din acea locație.
        </p>
      </div>
      <CustomMap />
    </div>
  );
};

export default Reviews;
