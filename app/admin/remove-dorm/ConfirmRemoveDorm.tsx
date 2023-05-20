"use client";

import fetcher from "@/common/utils/functions";
import Button from "@/components/Button";
import { useState } from "react";
import useSWR from "swr";

interface ConfirmRemoveDormProps {
  dormId: string;
}

export default function ConfirmRemoveDorm({ dormId }: ConfirmRemoveDormProps) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {
    data,
    error: err,
    isLoading,
  } = useSWR<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dorms/${dormId}`,
    fetcher
  );

  const dorm = data ? data.dorm : null;

  const handleRemove = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dorms/${dormId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setSuccess("Căminul a fost șters cu succes");
        setError("");
      } else {
        setSuccess("");
        setError("Eroare la ștergerea căminului");
      }
    });
  };

  return (
    dorm && (
      <>
        <h1>Ești sigur că vrei să ștergi acest cămin?</h1>
        <h1>
          {dorm.name}, {dorm.university.name}
        </h1>

        {success && <h1 className="text-green-500">{success}</h1>}
        {error && <h1 className="text-red-500">{error}</h1>}

        <p className="text-red-500">
          * ștergerea căminului va șterge și toate recenziile asociate
        </p>
        <p className="text-red-500">
          * odată ce ștergerea a avut loc, datele nu mai pot fi recuperate
        </p>
        <Button className="mt-2 px-6" onClick={handleRemove}>
          Șterge căminul
        </Button>
      </>
    )
  );
}
