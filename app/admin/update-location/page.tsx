"use client";

import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import LocationForm from "./LocationForm";

export default function UpdateLocationPage() {
  const [locationId, setLocationId] = useState("");

  const handleLocationId = (id: string) => setLocationId(id);

  return (
    <div className=" flex flex-col items-center gap-4">
      <h1>Selectează o locație</h1>
      <SearchInput
        placeholder="Timișoara"
        showUniversities={false}
        showDorms={false}
        setSelectedItem={handleLocationId}
      />
      {locationId && <LocationForm locationId={locationId} />}
    </div>
  );
}
