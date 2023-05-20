"use client";

import { isLatitude, isLongitude } from "@/common/utils/functions";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

export default function AddLocationPage() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (values: {
    name: string;
    description: string;
    lat: string;
    long: string;
  }) => {
    if (isLatitude(+values.lat) && isLongitude(+values.long)) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations`, {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          position: [+values.lat, +values.long],
        }),
      }).then((res) => {
        if (res.status === 201) {
          setSuccess("Locație adăugată cu succes");
          setError("");
          reset();
        } else {
          setError("Eroare la adăugarea locației");
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
      <h1>Nume locație</h1>
      <FormInput
        id="name"
        type="text"
        placeholder="Timișoara"
        register={register}
        rules={{
          required: true,
        }}
      />
      <h1>Descriere locație</h1>
      <textarea
        className=" min-w-full h-64 resize-none p-4 rounded-md border-2 border-primary-800 focus:border-primary-100 placeholder-gray-1 outline-none"
        placeholder="Timișoara este municipiul de reședință al județului Timiș...."
        {...register("description", { required: true })}
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
      {success && <h1 className="text-green-500">{success}</h1>}
      {error && <h1 className="text-red-500">{error}</h1>}
      <Button className="mt-2 px-6" type="submit">
        Adaugă
      </Button>
    </form>
  );
}
