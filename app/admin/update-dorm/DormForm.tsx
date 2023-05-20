"use client";

import fetcher, { isLatitude, isLongitude } from "@/common/utils/functions";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import SelectUniversity from "./SelectUniversity";

interface DormFormProps {
  dormId: any;
}

export default function DormForm({ dormId }: DormFormProps) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [newDorm, setNewDorm] = useState<any>();
  const [newUniversityId, setNewUniversityId] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const {
    data,
    error: err,
    isLoading,
  } = useSWR<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dorms/${dormId}`,
    fetcher
  );

  const dorm = data ? data.dorm : null;

  const initialDorm = dorm;

  useEffect(() => {
    setNewDorm(dorm);
  }, [dorm]);

  const onFirstSubmit: SubmitHandler<FieldValues> = async (values: {
    name: string;
    address: string;
    lat: string;
    long: string;
  }) => {
    const reformatedInitialDorm = {
      ...initialDorm,
      university: initialDorm.university._id,
    };

    const inputDorm = {
      ...dorm,
      name: values.name,
      address: values.address,
      position: [+values.lat, +values.long],
      university: newUniversityId || initialDorm.university._id,
    };

    console.log("input:", inputDorm.university);
    console.log("initial: ", reformatedInitialDorm.university);
    console.log("selected: ", newUniversityId);

    if (
      isLatitude(+values.lat) &&
      isLongitude(+values.long) &&
      JSON.stringify(inputDorm) !== JSON.stringify(reformatedInitialDorm)
    ) {
      setNewDorm(inputDorm);
      toggleOnWarning();
      setSuccess("");
      setError("");
    } else {
      setSuccess("");
      setError("Nu ai schimbat datele");
    }
  };

  const onSecondSubmit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dorms`, {
      method: "PUT",
      body: JSON.stringify(newDorm),
    }).then(async (res) => {
      if (res.ok) {
        setSuccess("Cămin actualizat cu succes");
        setError("");
      } else {
        const response = await res.json();
        setSuccess("");
        setError(response.error);
      }
    });
    toggleOffWarning();
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/dorms/${dormId}`);
  };

  const toggleOnWarning = () => setShowWarning(true);
  const toggleOffWarning = () => setShowWarning(false);

  const selectUniversity = (universityId: string) =>
    setNewUniversityId(universityId);

  return (
    newDorm &&
    (!showWarning ? (
      <>
        <form
          onSubmit={handleSubmit(onFirstSubmit)}
          className="w-96 flex flex-col items-start gap-4"
        >
          <h1>Nume (actual: {initialDorm.name})</h1>
          <FormInput
            id="name"
            type="text"
            placeholder={"Nume"}
            defaultValue={newDorm.name}
            register={register}
            rules={{
              required: true,
            }}
          />

          <h1>Adresă (actual: {initialDorm.address})</h1>
          <FormInput
            id="address"
            type="text"
            placeholder={"Aleea Studenţilor 12"}
            defaultValue={newDorm.address}
            register={register}
            rules={{
              required: true,
            }}
          />

          <h1>
            Poziție (actual: lat: {initialDorm.position[0]}, long:{" "}
            {initialDorm.position[1]})
          </h1>
          <div className="flex gap-2">
            <FormInput
              id="lat"
              type="text"
              placeholder="Latitudine"
              defaultValue={newDorm.position[0]}
              register={register}
              rules={{
                required: true,
              }}
            />
            <FormInput
              id="long"
              type="text"
              placeholder="Latitudine"
              defaultValue={newDorm.position[1]}
              register={register}
              rules={{
                required: true,
              }}
            />
          </div>

          <h1>Universitate (actual: {initialDorm.university.name})</h1>
          <SelectUniversity selectUniversity={selectUniversity} />

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
            {initialDorm.name !== newDorm.name && (
              <h1>Nume: {initialDorm.name + " -> " + newDorm.name}</h1>
            )}
            {initialDorm.university._id !== newDorm.university && (
              <h1>
                Universitate:{" "}
                {initialDorm.university._id + " -> " + newUniversityId}
              </h1>
            )}
            {(initialDorm.position[0] !== newDorm.position[0] ||
              initialDorm.position[1] !== newDorm.position[1]) && (
              <>
                <h1>
                  Latitudine:{" "}
                  {initialDorm.position[0] + " -> " + newDorm.position[0]}
                </h1>
                <h1>
                  Latitudine:{" "}
                  {initialDorm.position[1] + " -> " + newDorm.position[1]}
                </h1>
              </>
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
