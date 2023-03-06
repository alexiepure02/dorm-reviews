"use client";

import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { BiMailSend } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { useState } from "react";

export default function RequestPasswordReset() {
  const router = useRouter();
  const [error, setError] = useState("");

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (values: {
    email: string;
  }) => {
    await fetch("http://localhost:3000/api/auth/request-password-reset", {
      method: "POST",
      body: JSON.stringify(values.email),
    })
      .then((res) => {
        if (res.status === 200)
          router.push("/request-password-reset/succesful");
        return res.json();
      })
      .then((data) => {
        setError(data.error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col grow max-w-[360px] gap-4"
    >
      <svg width="0" height="0">
        <linearGradient id="orange-gradient">
          <stop stopColor="#F64C18" offset="0%" />
          <stop stopColor="#EF9045" offset="100%" />
        </linearGradient>
      </svg>
      <BiMailSend
        className="self-center w-40 h-40"
        style={{ fill: "url(#orange-gradient)" }}
      />
      <p className="text-gray-2 text-center">
        Ați uitat parola? Nu vă faceți griji, introduceți adresa dumeavoastră de
        mail și vă vom trimite un link pentru a vă recupera parola.
      </p>
      <FormInput
        id="email"
        type="text"
        placeholder="Email"
        register={register}
        Icon={AiOutlineUser}
        rules={{ required: true }}
      />
      <p className="self-center text-red-500 text-center">{error}</p>

      <Button type="submit">Trimite e-mail</Button>
      <Link
        href={"/login"}
        className="self-center text-gray-2 hover:text-primary-200"
      >
        Înapoi la autentificare
      </Link>
    </form>
  );
}
