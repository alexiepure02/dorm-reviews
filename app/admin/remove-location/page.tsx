"use client";

import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import ConfirmRemoveLocation from "./ConfirmRemoveLocation";

export default function RemoveLocationPage() {
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
      {locationId && <ConfirmRemoveLocation locationId={locationId} />}
    </div>
  );
}
