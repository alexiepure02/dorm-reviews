"use client";

import { isLatitude, isLongitude } from "@/common/utils/functions";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

export default function AddDormPage() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [universityId, setUniversityId] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const handleUniversityId = (id: string) => setUniversityId(id);

  const onSubmit: SubmitHandler<FieldValues> = async (values: {
    name: string;
    address: string;
    lat: string;
    long: string;
  }) => {
    if (isLatitude(+values.lat) && isLongitude(+values.long) && universityId) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dorms`, {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          address: values.address,
          position: [+values.lat, +values.long],
          university: universityId,
        }),
      }).then(async (res) => {
        if (res.status === 201) {
          setSuccess("Universitate adăugată cu succes");
          setError("");
          reset();
          setUniversityId("");
        } else {
          setError("Eroare la adăugarea universității");
        }
      });
    } else {
      setError("Datele introduse sunt invalide");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-96 flex flex-col items-start gap-4"
    >
      <h1>Nume cămin</h1>
      <FormInput
        id="name"
        type="text"
        placeholder="C13"
        register={register}
        rules={{
          required: true,
        }}
      />
      <h1>Adresă cămin</h1>
      <FormInput
        id="address"
        type="text"
        placeholder="Aleea Studenţilor 12"
        register={register}
        rules={{
          required: true,
        }}
      />
      <h1>Poziție (latitudine, longitudine)</h1>
      <div className="flex gap-2">
        <FormInput
          id="lat"
          type="text"
          placeholder="Latitudine"
          register={register}
          rules={{
            required: true,
          }}
        />
        <FormInput
          id="long"
          type="text"
          placeholder="Latitudine"
          register={register}
          rules={{
            required: true,
          }}
        />
      </div>
      <h1>Universitate</h1>
      <SearchInput
        placeholder="Universitatea de Vest Timișoara"
        showLocations={false}
        showDorms={false}
        setSelectedItem={handleUniversityId}
      />
      {success && <h1 className="text-green-500">{success}</h1>}
      {error && <h1 className="text-red-500">{error}</h1>}
      <Button className="mt-2 px-6" type="submit">
        Adaugă
      </Button>
    </form>
  );
}
