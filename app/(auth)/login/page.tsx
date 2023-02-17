"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { BiLockOpen, BiUserPin } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

export default function Login() {
  const router = useRouter();

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
    console.log("entering on submit.");
    console.log("values: ", values.email, values.password);

    const res: any = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}`,
    });

    console.log("after signIn");

    res?.error ? console.log(res.error) : redirectToHome();
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
      <BiUserPin
        className="self-center w-40 h-40"
        style={{ fill: "url(#orange-gradient)" }}
      />
      <Input
        id="email"
        type="text"
        placeholder="Nume de utilizator sau email"
        register={register}
        Icon={AiOutlineUser}
      />

      <Input
        id="password"
        type="password"
        placeholder="Parolă"
        register={register}
        Icon={BiLockOpen}
      />
      <Link
        href={"/request-password-reset"}
        className="self-end text-gray-2 hover:text-primary-200"
      >
        Ai uitat parola?
      </Link>

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
