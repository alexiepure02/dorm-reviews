"use client";

import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import ConfirmRemoveDorm from "./ConfirmRemoveDorm";

export default function RemoveDormPage() {
  const [dormId, setDormId] = useState("");

  const handleDormId = (id: string) => setDormId(id);

  return (
    <div className=" flex flex-col items-center gap-4">
      <h1>Selectează un cămin</h1>
      <SearchInput
        placeholder="C13"
        showLocations={false}
        showUniversities={false}
        setSelectedItem={handleDormId}
      />
      {dormId && <ConfirmRemoveDorm dormId={dormId} />}
    </div>
  );
}
