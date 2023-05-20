"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const token = useSearchParams()?.get("token");
  const id = useSearchParams()?.get("id");

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (values: {
    password: string;
    cpassword: string;
  }) => {
    console.log(
      JSON.stringify({
        token: token,
        userId: id,
        password: values.password,
        cpassword: values.cpassword,
      })
    );

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/password-reset`, {
      method: "POST",
      body: JSON.stringify({
        token: token,
        userId: id,
        password: values.password,
        cpassword: values.cpassword,
      }),
    })
      .then((res) => {
        if (res.status === 200) router.push("/password-reset/succesful");
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
      <BiLockOpen
        className="self-center w-40 h-40"
        style={{ fill: "url(#orange-gradient)" }}
      />
      <p className="text-gray-2 text-center">
        Introduceți noua parolă pentru a fi actualizată în sistemul nostru.
      </p>

      <FormInput
        id="password"
        type="password"
        placeholder="Parola nouă"
        register={register}
        Icon={BiLockOpen}
        rules={{ required: true, minLength: 8, maxLength: 32 }}
      />

      <FormInput
        id="cpassword"
        type="password"
        placeholder="Confirmă parola nouă"
        register={register}
        Icon={BiLock}
        rules={{ required: true, minLength: 8, maxLength: 32 }}
      />
      <p className="self-center text-red-500 text-center">{error}</p>

      <Button type="submit">Resetează parola</Button>
    </form>
  );
}
