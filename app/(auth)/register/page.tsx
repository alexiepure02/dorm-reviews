"use client";

import Link from "next/link";
// import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
// import { useFormik } from 'formik';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiLock, BiLockOpen, BiMailSend, BiUserPin } from "react-icons/bi";
import FormInput from "@/components/FormInput";
import { AiOutlineUser } from "react-icons/ai";
import Button from "@/components/Button";
import { checkEnvironment } from "@/common/utils/checkEnvironment";

export default function Register() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // react-hook-form
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
    await fetch(`${checkEnvironment()}/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        setError(data.error);
        setSuccess(data.msg);
        if (data.msg) reset();
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
      <p className="self-center bg-green-500 bg-opacity-50 px-2 ">{success}</p>

      <FormInput
        id="username"
        type="text"
        placeholder="Nume de utilizator"
        register={register}
        Icon={AiOutlineUser}
        rules={{ required: true, minLength: 5, maxLength: 32 }}
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
        rules={{ required: true, minLength: 8, maxLength: 32 }}
      />

      <FormInput
        id="cpassword"
        type="password"
        placeholder="Confirmă parola"
        register={register}
        Icon={BiLock}
        rules={{ required: true, minLength: 8, maxLength: 32 }}
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
