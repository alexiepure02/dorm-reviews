"use client";

import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import UniversityForm from "./UniversityForm";

export default function UpdateUniversityPage() {
  const [universityId, setUniversityId] = useState("");

  const handleUniversityId = (id: string) => setUniversityId(id);

  return (
    <div className=" flex flex-col items-center gap-4">
      <h1>Selectează o universitate</h1>
      <SearchInput
        placeholder="Universitatea de Vest Timișoara"
        showLocations={false}
        showDorms={false}
        setSelectedItem={handleUniversityId}
      />
      {universityId && <UniversityForm universityId={universityId} />}
    </div>
  );
}
