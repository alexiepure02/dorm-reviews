"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { BiLock, BiLockOpen, BiMailSend, BiUserPin } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

export default function Login() {
  const router = useRouter();

  const token = useSearchParams().get("token");
  const id = useSearchParams().get("id");

  console.log("token: ", token);
  console.log("id: ", id);

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
    console.log("entering on submit.");
    console.log("password: ", values.password);
    console.log("cpassword: ", values.cpassword);

    // validate password

    console.log("calling api");
    await fetch("http://localhost:3000/api/auth/password-reset", {
      method: "POST",
      body: JSON.stringify({
        token: token,
        userId: id,
        password: values.password,
      }),
    })
      .then((res) => {
        if (res.status === 200) router.push("/password-reset/succesful");
        else console.log("reset password failed.");
      })
      .then((data) => {
        console.log("error?", data);
      });
  };

  const redirectToHome = () => {
    // TODO: redirect to a success register page
    console.log("rediect to home");
    router.push("/");
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
      <Input
        id="password"
        type="password"
        placeholder="Parola nouă"
        register={register}
        Icon={BiLockOpen}
      />

      <Input
        id="cpassword"
        type="password"
        placeholder="Confirmă parola nouă"
        register={register}
        Icon={BiLock}
      />

      <Button type="submit">Resetează parola</Button>
    </form>
  );
}
