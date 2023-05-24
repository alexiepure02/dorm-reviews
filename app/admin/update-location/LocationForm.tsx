"use client";

import { Role } from "@/common/Constants";
import fetcher, { isLatitude, isLongitude } from "@/common/utils/functions";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";

interface LocationFormProps {
  locationId: any;
}

export default function LocationForm({ locationId }: LocationFormProps) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [newLocation, setNewLocation] = useState<any>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const {
    data: location,
    error: err,
    isLoading,
  } = useSWR<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/locations/${locationId}`,
    fetcher
  );

  const initialLocation = location;

  useEffect(() => {
    setNewLocation(location);
  }, [location]);

  const onFirstSubmit: SubmitHandler<FieldValues> = async (values: {
    name: string;
    description: string;
    lat: string;
    long: string;
  }) => {
    if (isLatitude(+values.lat) && isLongitude(+values.long)) {
      const inputLocation = {
        ...location,
        name: values.name,
        description: values.description,
        position: [+values.lat, +values.long],
      };

      if (
        isLatitude(+values.lat) &&
        isLongitude(+values.long) &&
        JSON.stringify(inputLocation) !== JSON.stringify(initialLocation)
      ) {
        setNewLocation(inputLocation);
        toggleOnWarning();
        setSuccess("");
        setError("");
      } else {
        setSuccess("");
        setError("Nu ai schimbat datele");
      }
    } else {
      setSuccess("");
      setError("Datele introduse sunt invalide");
    }
  };

  const onSecondSubmit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations`, {
      method: "PUT",
      body: JSON.stringify(newLocation),
    }).then(async (res) => {
      if (res.ok) {
        setSuccess("Locație actualizată cu succes");
        setError("");
      } else {
        const response = await res.json();
        setSuccess("");
        setError(response.error);
      }
    });
    toggleOffWarning();
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/locations/${locationId}`);
  };

  const toggleOnWarning = () => setShowWarning(true);
  const toggleOffWarning = () => setShowWarning(false);

  return (
    newLocation &&
    (!showWarning ? (
      <>
        <form
          onSubmit={handleSubmit(onFirstSubmit)}
          className="w-96 flex flex-col items-start gap-4"
        >
          <h1>Nume (actual: {initialLocation.name})</h1>
          <FormInput
            id="name"
            type="text"
            placeholder={"Nume"}
            defaultValue={newLocation.name}
            register={register}
            rules={{
              required: true,
            }}
          />
          <h1>Descriere (actual: {initialLocation.description})</h1>
          <textarea
            className=" min-w-full h-64 resize-none p-4 rounded-md border-2 border-primary-800 focus:border-primary-100 placeholder-gray-1 outline-none"
            placeholder="Descriere"
            defaultValue={newLocation.description}
            {...register("description", { required: true })}
          />
          <h1>
            Poziție (actual: lat: {initialLocation.position[0]}, long:{" "}
            {initialLocation.position[1]})
          </h1>
          <div className="flex gap-2">
            <FormInput
              id="lat"
              type="text"
              placeholder="Latitudine"
              defaultValue={newLocation.position[0]}
              register={register}
              rules={{
                required: true,
              }}
            />
            <FormInput
              id="long"
              type="text"
              placeholder="Latitudine"
              defaultValue={newLocation.position[1]}
              register={register}
              rules={{
                required: true,
              }}
            />
          </div>
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
            {initialLocation.name !== newLocation.name && (
              <h1>Nume: {initialLocation.name + " -> " + newLocation.name}</h1>
            )}
            {initialLocation.description !== newLocation.description && (
              <h1>
                Descriere:{" "}
                {initialLocation.description + " -> " + newLocation.description}
              </h1>
            )}
            {(initialLocation.position[0] !== newLocation.position[0] ||
              initialLocation.position[1] !== newLocation.position[1]) && (
              <>
                <h1>
                  Latitudine:{" "}
                  {initialLocation.position[0] +
                    " -> " +
                    newLocation.position[0]}
                </h1>
                <h1>
                  Latitudine:{" "}
                  {initialLocation.position[1] +
                    " -> " +
                    newLocation.position[1]}
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
