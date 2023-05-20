"use client";

import { Role } from "@/common/Constants";
import fetcher, { isLatitude, isLongitude } from "@/common/utils/functions";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";

interface UserFormProps {
  userId: any;
}

export default function UserForm({ userId }: UserFormProps) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [newUser, setNewUser] = useState<any>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const {
    data: user,
    error: err,
    isLoading,
  } = useSWR<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
    fetcher
  );

  const initialUser = user;

  useEffect(() => {
    setNewUser(user);
  }, [user]);

  const onFirstSubmit: SubmitHandler<FieldValues> = async (values: {
    username: string;
    email: string;
    role: Role;
  }) => {
    const inputUser = {
      ...user,
      username: values.username,
      email: values.email,
      role: values.role,
    };

    if (JSON.stringify(inputUser) !== JSON.stringify(initialUser)) {
      setNewUser(inputUser);
      toggleOnWarning();
      setSuccess("");
      setError("");
    } else {
      setSuccess("");
      setError("Nu ai schimbat datele");
    }
  };

  const onSecondSubmit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: "PUT",
      body: JSON.stringify(newUser),
    }).then(async (res) => {
      if (res.ok) {
        setSuccess("Utilizator actualizat cu succes");
        setError("");
      } else {
        const response = await res.json();
        setSuccess("");
        setError(response.error);
      }
    });
    toggleOffWarning();
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`);
  };

  const toggleOnWarning = () => setShowWarning(true);
  const toggleOffWarning = () => setShowWarning(false);

  return (
    newUser &&
    (!showWarning ? (
      <>
        <form
          onSubmit={handleSubmit(onFirstSubmit)}
          className="w-96 flex flex-col items-start gap-4"
        >
          <h1>Nume de utilizator (actual: {initialUser.username})</h1>
          <FormInput
            id="username"
            type="text"
            placeholder={"Nume de utilizator"}
            defaultValue={newUser.username}
            register={register}
            rules={{
              required: true,
            }}
          />
          <h1>Adresă de email (actual: {initialUser.email})</h1>
          <FormInput
            id="email"
            type="text"
            placeholder={"Adresă de email"}
            defaultValue={newUser.email}
            register={register}
            rules={{
              required: true,
            }}
          />
          <h1>
            Rol (actual:{" "}
            {initialUser.role === Role.user ? "utilizator" : Role.admin})
          </h1>
          <div className="flex gap-2">
            <input
              id="role"
              type="radio"
              defaultChecked={newUser.role === Role.admin}
              value={Role.admin}
              {...register("role")}
            />
            <h1>Admin</h1>
          </div>
          <div className="flex gap-2">
            <input
              id="role"
              type="radio"
              defaultChecked={newUser.role === Role.user}
              value={Role.user}
              {...register("role")}
            />
            <h1>Utilizator</h1>
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
            {initialUser.username !== newUser.username && (
              <h1>Nume: {initialUser.username + " -> " + newUser.username}</h1>
            )}
            {initialUser.email !== newUser.email && (
              <h1>Email: {initialUser.email + " -> " + newUser.email}</h1>
            )}
            {initialUser.role !== newUser.role && (
              <h1>Rol: {initialUser.role + " -> " + newUser.role}</h1>
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
