"use client";

import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

export default function AddUniversityPage() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [locationId, setLocationId] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const handleLocationId = (id: string) => setLocationId(id);

  const onSubmit: SubmitHandler<FieldValues> = async (values: {
    name: string;
    description: string;
  }) => {
    if (locationId) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/universities`, {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          location: locationId,
        }),
      }).then((res) => {
        if (res.status === 201) {
          setSuccess("Universitate adăugată cu succes");
          setError("");
          reset();
          setLocationId("");
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
      <h1>Nume universitate</h1>
      <FormInput
        id="name"
        type="text"
        placeholder="Universitatea de Vest Timișoara"
        register={register}
        rules={{
          required: true,
        }}
      />
      <h1>Descriere universitate</h1>
      <textarea
        className=" min-w-full h-64 resize-none p-4 rounded-md border-2 border-primary-800 focus:border-primary-100 outline-none"
        placeholder="Universitatea de Vest din Timișoara (abreviată UVT) este principala instituție de învățământ superior și centru de cercetare din vestul României..."
        {...register("description", { required: true })}
      />
      <h1>Locație</h1>
      <SearchInput
        placeholder="Timișoara"
        showUniversities={false}
        showDorms={false}
        setSelectedItem={handleLocationId}
      />
      {success && <h1 className="text-green-500">{success}</h1>}
      {error && <h1 className="text-red-500">{error}</h1>}
      <Button className="mt-2 px-6" type="submit">
        Adaugă
      </Button>
    </form>
  );
}
