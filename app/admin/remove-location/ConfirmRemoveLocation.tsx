"use client";

import fetcher from "@/common/utils/functions";
import Button from "@/components/Button";
import ReviewsSection from "@/components/ReviewsSection";
import { useState } from "react";
import useSWR from "swr";

interface ConfirmRemoveLocationProps {
  locationId: string;
}

export default function ConfirmRemoveLocation({
  locationId,
}: ConfirmRemoveLocationProps) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {
    data: location,
    error: err,
    isLoading,
  } = useSWR<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/locations/${locationId}`,
    fetcher
  );

  const handleRemove = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/locations/${locationId}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        setSuccess("Locația a fost ștearsă cu succes");
        setError("");
      } else {
        setSuccess("");
        setError(`Eroare la ștergerea locației`);
      }
    });
  };

  return (
    location && (
      <>
        <h1>Ești sigur că vrei să ștergi această locație?</h1>
        <h1>{location.name}</h1>

        {success && <h1 className="text-green-500">{success}</h1>}
        {error && <h1 className="text-red-500">{error}</h1>}

        <p className="text-red-500">
          * ștergerea locației va șterge și toate universitățile asociate acesteia
        </p>
        <p className="text-red-500">
          * odată ce ștergerea a avut loc, datele nu mai pot fi recuperate
        </p>
        <Button className="mt-2 px-6" onClick={handleRemove}>
          Șterge locația
        </Button>
      </>
    )
  );
}
