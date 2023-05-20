"use client";

import fetcher from "@/common/utils/functions";
import Button from "@/components/Button";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import useSWR from "swr";
import SelectReviews from "./SelectReviews";

export default function RemoveReviewPage() {
  const [dormId, setDormId] = useState("");

  const handleDormId = (id: string) => setDormId(id);

  return (
    <div className=" flex flex-col items-center gap-4">
      <h1>Selectează un pentru a-i vedea recenziile.</h1>
      <SearchInput
        placeholder="C13"
        showLocations={false}
        showUniversities={false}
        setSelectedItem={handleDormId}
      />
      {dormId && (
        <>
          <h1>Selectează recenziile pe care dorești să le ștergi (căsuță stânga).</h1>
          <SelectReviews dormId={dormId} />
        </>
      )}
    </div>
  );
}
