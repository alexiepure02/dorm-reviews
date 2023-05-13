"use client";

import Link from "next/link";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiLock, BiLockOpen, BiMailSend, BiUserPin } from "react-icons/bi";
import FormInput from "@/components/FormInput";
import { AiOutlineUser } from "react-icons/ai";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import {
  MAX_CHARS_USERNAME,
  MIN_CHARS_PASSWORD,
  MIN_CHARS_USERNAME,
} from "@/common/Constants";

export default function Register() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (values: {
    username: string;
    email: string;
    password: string;
    cpassword: string;
  }) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        setError(data.error);
        setSuccess(data.msg);

        if (data.msg) {
          reset();
          setTimeout(() => {
            router.push("/login");
          }, 5000);
        }
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
      <BiUserPin
        className="self-center w-40 h-40"
        style={{ fill: "url(#orange-gradient)" }}
      />
      <p className="self-center bg-green-500 bg-opacity-50 px-2">{success}</p>
      {success !== undefined && success.length !== 0 && (
        <p className="self-center text-gray-2 text-center px-2">
          În 5 secunde vei fi redirecționat la pagina de autentificare.
        </p>
      )}
      <FormInput
        id="username"
        type="text"
        placeholder="Nume de utilizator"
        register={register}
        Icon={AiOutlineUser}
        rules={{
          required: true,
          minLength: MIN_CHARS_USERNAME,
          maxLength: MAX_CHARS_USERNAME,
        }}
      />

      <FormInput
        id="email"
        type="text"
        placeholder="Email"
        register={register}
        Icon={BiMailSend}
        rules={{ required: true }}
      />

      <FormInput
        id="password"
        type="password"
        placeholder="Parolă"
        register={register}
        Icon={BiLockOpen}
        rules={{ required: true, minLength: MIN_CHARS_PASSWORD }}
      />

      <FormInput
        id="cpassword"
        type="password"
        placeholder="Confirmă parola"
        register={register}
        Icon={BiLock}
        rules={{ required: true, minLength: MIN_CHARS_PASSWORD }}
      />
      <p className="self-center text-red-500 text-center">{error}</p>
      <Button type="submit">Creează cont</Button>
      <Link
        href={"/login"}
        className="self-center text-gray-2 hover:text-primary-200"
      >
        Ai deja un cont? Conectează-te
      </Link>
    </form>
  );
}
