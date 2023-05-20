"use client";

import { Role } from "@/common/Constants";
import fetcher, { isLatitude, isLongitude } from "@/common/utils/functions";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import SelectLocation from "./SelectLocation";

interface UniversityFormProps {
  universityId: any;
}

export default function UniversityForm({ universityId }: UniversityFormProps) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [newUniversity, setNewUniversity] = useState<any>();
  const [newLocationId, setNewLocationId] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const {
    data: university,
    error: err,
    isLoading,
  } = useSWR<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/universities/${universityId}`,
    fetcher
  );

  const initialUniversity = university;

  useEffect(() => {
    setNewUniversity(university);
  }, [university]);

  const onFirstSubmit: SubmitHandler<FieldValues> = async (values: {
    name: string;
    description: string;
  }) => {
    const reformatedInitialUniversity = {
      ...initialUniversity,
      location: initialUniversity.location._id,
    };

    const inputUniversity = {
      ...university,
      name: values.name,
      description: values.description,
      location: newLocationId || initialUniversity.location._id,
    };

    console.log(inputUniversity.location);
    console.log(reformatedInitialUniversity.location);
    console.log(newLocationId);

    if (
      JSON.stringify(inputUniversity) !==
      JSON.stringify(reformatedInitialUniversity)
    ) {
      setNewUniversity(inputUniversity);
      toggleOnWarning();
      setSuccess("");
      setError("");
    } else {
      setSuccess("");
      setError("Nu ai schimbat datele");
    }
  };

  const onSecondSubmit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/universities`, {
      method: "PUT",
      body: JSON.stringify(newUniversity),
    }).then(async (res) => {
      if (res.ok) {
        setSuccess("Universitate actualizată cu succes");
        setError("");
      } else {
        const response = await res.json();
        setSuccess("");
        setError(response.error);
      }
    });
    toggleOffWarning();
    mutate(
      `${process.env.NEXT_PUBLIC_API_URL}/api/universities/${universityId}`
    );
  };

  const toggleOnWarning = () => setShowWarning(true);
  const toggleOffWarning = () => setShowWarning(false);

  const selectLocation = (locationId: string) => setNewLocationId(locationId);

  return (
    newUniversity &&
    (!showWarning ? (
      <>
        <form
          onSubmit={handleSubmit(onFirstSubmit)}
          className="w-96 flex flex-col items-start gap-4"
        >
          <h1>Nume (actual: {initialUniversity.name})</h1>
          <FormInput
            id="name"
            type="text"
            placeholder={"Nume"}
            defaultValue={newUniversity.name}
            register={register}
            rules={{
              required: true,
            }}
          />
          <h1>Descriere (actual: {initialUniversity.description})</h1>
          <textarea
            className=" min-w-full h-64 resize-none p-4 rounded-md border-2 border-primary-800 focus:border-primary-100 placeholder-gray-1 outline-none"
            placeholder="Descriere"
            defaultValue={newUniversity.description}
            {...register("description", { required: true })}
          />
          <h1>Locație (actual: {initialUniversity.location.name})</h1>
          <SelectLocation selectLocation={selectLocation} />
          {success && <h1 className="text-green-500">{success}</h1>}
          {error && <h1 className="text-red-500">{error}</h1>}
          <Button className="px-4" type="submit">
            Actualizează
          </Button>
        </form>
      </>
    ) : (
      <>
        <div className="py-4">
          <h1>Ești sigur că vrei să actualizezi datele?</h1>
          <h1>Odată actualizate, datele inițiale se vor pierde.</h1>
          <div className="py-6">
            {initialUniversity.name !== newUniversity.name && (
              <h1>
                Nume: {initialUniversity.name + " -> " + newUniversity.name}
              </h1>
            )}
            {initialUniversity.description !== newUniversity.description && (
              <h1>
                Descriere:{" "}
                {initialUniversity.description +
                  " -> " +
                  newUniversity.description}
              </h1>
            )}
            {initialUniversity.location._id !== newUniversity.location && (
              <h1>
                Locație:{" "}
                {initialUniversity.location._id + " -> " + newLocationId}
              </h1>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <Button className="px-4" onClick={toggleOffWarning}>
            Nu, mergi înapoi
          </Button>
          <Button className="px-4" onClick={onSecondSubmit}>
            Da, actualizează
          </Button>
        </div>
      </>
    ))
  );
}
