"use client";

import fetcher from "@/common/utils/functions";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import SelectLocation from "./SelectLocation";
import ImageInput from "@/components/ImageInput";
import ImagesGrid from "@/components/ImagesGrid";

interface UniversityFormProps {
  universityId: any;
}

export default function UniversityForm({ universityId }: UniversityFormProps) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [newUniversity, setNewUniversity] = useState<any>();
  const [newLocationId, setNewLocationId] = useState("");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

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

  const {
    data: imageUrls,
    error: errImageUrls,
    isLoading: isLoadingImageUrls,
  } = useSWR<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/image/${universityId}`,
    fetcher
  );

  const onFirstSubmit: SubmitHandler<FieldValues> = async (values: {
    name: string;
    acronym: string;
    description: string;
  }) => {
    const reformatedInitialUniversity = {
      ...initialUniversity,
      location: initialUniversity.location._id,
    };

    const inputUniversity = {
      ...university,
      name: values.name,
      acronym: values.acronym,
      description: values.description,
      location: newLocationId || initialUniversity.location._id,
    };

    if (
      JSON.stringify(inputUniversity) !==
        JSON.stringify(reformatedInitialUniversity) ||
      newImages.length !== 0
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
    setLoading(true);

    const reformatedInitialUniversity = {
      ...initialUniversity,
      location: initialUniversity.location._id,
    };

    if (
      JSON.stringify(newUniversity) !==
      JSON.stringify(reformatedInitialUniversity)
    ) {
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
    }

    if (newImages.length !== 0) {
      const formData = new FormData();

      formData.append("name", initialUniversity._id);

      newImages.forEach((image) => {
        formData.append("images", image);
      });

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/image`, {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        if (res.ok) {
          setSuccess("Universitate actualizată cu succes");
          setError("");
        } else {
          const response = await res.json();
          setSuccess("");
          setError(response.error);
          return;
        }
      });
      setNewImages([]);
    }

    mutate(
      `${process.env.NEXT_PUBLIC_API_URL}/api/universities/${universityId}`
    );
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/image/${universityId}`);

    toggleOffWarning();
  };

  const toggleOnWarning = () => setShowWarning(true);
  const toggleOffWarning = () => {
    setLoading(false);
    setShowWarning(false);
  };

  const selectLocation = (locationId: string) => setNewLocationId(locationId);

  const handleNewImages = (images: File[]) => {
    setNewImages(images);
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const removeExistingImage = async (imageIndex: string) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/image/${universityId}/${imageIndex}`,
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

    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/image/${universityId}`);
  };

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

          <h1>Acronim (actual: {initialUniversity.acronym})</h1>
          <FormInput
            id="acronym"
            type="text"
            placeholder={"Acronim"}
            defaultValue={newUniversity.acronym}
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

          <h1>Imagini actuale:</h1>
          {imageUrls && imageUrls.length !== 0 && (
            <ImagesGrid
              removable
              removeImage={removeExistingImage}
              images={imageUrls}
            />
          )}

          <h1>Adaugă imagini noi: (landscape)</h1>
          <ImageInput newImages={newImages} handleNewImages={handleNewImages} />

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

            {initialUniversity.acronym !== newUniversity.acronym && (
              <h1>
                Acronim:{" "}
                {initialUniversity.acronym + " -> " + newUniversity.acronym}
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

            {newImages.length !== 0 && (
              <>
                <h1>Ai adăugat imagini noi:</h1>

                <div className="grid grid-cols-2 gap-2">
                  {newImages.map((image: File, index: number) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      className="w-64"
                    />
                  ))}
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
