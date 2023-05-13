"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { BiLockOpen, BiUserPin } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { useState } from "react";

export const metadata = {
  title: "Autentificare - Căminul Tău",
};

export default function Login() {
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
    password: string;
  }) => {
    const res: any = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}`,
    });

    res?.error ? setError(res.error) : router.push("/");
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
      <FormInput
        id="email"
        type="text"
        placeholder="Nume de utilizator sau email"
        register={register}
        Icon={AiOutlineUser}
        rules={{ required: true }}
      />

      <FormInput
        id="password"
        type="password"
        placeholder="Parolă"
        register={register}
        Icon={BiLockOpen}
        rules={{ required: true }}
      />

      <div className="flex justify-between">
        <p className=" text-red-500 text-center">{error}</p>
        <Link
          href={"/request-password-reset"}
          className="text-gray-2 hover:text-primary-200"
        >
          Ai uitat parola?
        </Link>
      </div>

      <Button type="submit">Autentificare</Button>
      <Link
        href={"/register"}
        className="self-center text-gray-2 hover:text-primary-200"
      >
        Creează cont nou
      </Link>
    </form>
  );
}
