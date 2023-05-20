"use client";

import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import DormForm from "./DormForm";

export default function UpdateDormPage() {
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
      {dormId && <DormForm dormId={dormId} />}
    </div>
  );
}
