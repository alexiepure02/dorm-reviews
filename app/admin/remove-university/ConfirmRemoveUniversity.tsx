"use client";

import fetcher from "@/common/utils/functions";
import Button from "@/components/Button";
import { useState } from "react";
import useSWR from "swr";

interface ConfirmRemoveUniversityProps {
  universityId: string;
}

export default function ConfirmRemoveUniversity({
  universityId,
}: ConfirmRemoveUniversityProps) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {
    data: university,
    error: err,
    isLoading,
  } = useSWR<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/universities/${universityId}`,
    fetcher
  );

  const handleRemove = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/universities/${universityId}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        setSuccess("Universitatea a fost ștearsă cu succes");
        setError("");
      } else {
        setSuccess("");
        setError("Eroare la ștergerea universității");
      }
    });
  };

  return (
    university && (
      <>
        <h1>Ești sigur că vrei să ștergi această universitate?</h1>
        <h1>
          {university.name}, {university.location.name}
        </h1>

        {success && <h1 className="text-green-500">{success}</h1>}
        {error && <h1 className="text-red-500">{error}</h1>}

        <p className="text-red-500">
          * ștergerea universității va șterge și toate căminele asociate
          acesteia
        </p>
        <p className="text-red-500">
          * odată ce ștergerea a avut loc, datele nu mai pot fi recuperate
        </p>
        <Button className="mt-2 px-6" onClick={handleRemove}>
          Șterge universitatea
        </Button>
      </>
    )
  );
}
