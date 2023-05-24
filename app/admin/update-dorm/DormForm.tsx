"use client";

import fetcher, { isLatitude, isLongitude } from "@/common/utils/functions";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import SelectUniversity from "./SelectUniversity";
import ImageInput from "@/components/ImageInput";
import ImagesGrid from "@/components/ImagesGrid";

interface DormFormProps {
  dormId: any;
}

export default function DormForm({ dormId }: DormFormProps) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [newDorm, setNewDorm] = useState<any>();
  const [newUniversityId, setNewUniversityId] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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

  const {
    data: imageUrls,
    error: errImageUrls,
    isLoading: isLoadingImageUrls,
  } = useSWR<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/image/${dormId}`,
    fetcher
  );

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

    if (
      (isLatitude(+values.lat) &&
        isLongitude(+values.long) &&
        JSON.stringify(inputDorm) !== JSON.stringify(reformatedInitialDorm)) ||
      newImage
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
    setLoading(true);

    const reformatedInitialDorm = {
      ...initialDorm,
      university: initialDorm.university._id,
    };

    if (JSON.stringify(newDorm) !== JSON.stringify(reformatedInitialDorm)) {
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
    }

    if (newImage) {
      const formData = new FormData();

      formData.append("name", initialDorm._id);
      formData.append("file", newImage);

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/image`, {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        if (res.ok) {
          setSuccess("Cămin actualizat cu succes");
          setError("");
        } else {
          const response = await res.json();
          setSuccess("");
          setError(response.error);
          return;
        }
      });
      setNewImage(null);
    }

    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/dorms/${dormId}`);
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/image/${dormId}`);

    toggleOffWarning();
  };

  const toggleOnWarning = () => setShowWarning(true);
  const toggleOffWarning = () => {
    setLoading(false);
    setShowWarning(false);
  };

  const selectUniversity = (universityId: string) =>
    setNewUniversityId(universityId);

  const handleNewImage = (image: File | null) => {
    setNewImage(image);
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const removeExistingImage = async (imageIndex: string) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/image/${dormId}/${imageIndex}`,
      {
        method: "DELETE",
      }
    ).then(async (res) => {
      if (res.ok) {
        setSuccess("Imagine ștearsă cu succes");
        setError("");
      } else {
        const response = await res.json();
        setSuccess("");
        setError("Eroare la ștergerea imaginilor: " + response.message);
      }
    });

    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/image/${dormId}`);
  };

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

          <h1>Imagini actuale:</h1>
          {imageUrls && imageUrls.length !== 0 && (
            <ImagesGrid
              removable
              removeImage={removeExistingImage}
              images={imageUrls}
            />
          )}

          <h1>Adaugă o imagine: (landscape)</h1>
          <ImageInput
            newImage={newImage}
            handleNewImage={handleNewImage}
            handleError={handleError}
          />

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
            {newImage && (
              <>
                <h1>Ai adăugat o imagine nouă:</h1>
                <div className="grid grid-cols-2 gap-2">
                  <img src={URL.createObjectURL(newImage)} className="w-64" />
                </div>
              </>
            )}
          </div>
        </div>
        {!loading ? (
          <div className="flex gap-4">
            <Button className="px-4" onClick={toggleOffWarning}>
              Nu, mergi înapoi
            </Button>
            <Button className="px-4" onClick={onSecondSubmit}>
              Da, actualizează
            </Button>
          </div>
        ) : (
          <h1>Așteaptă...</h1>
        )}
      </>
    ))
  );
}
