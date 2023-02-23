"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { BiLockOpen, BiMailSend, BiUserPin } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

export default function RequestPasswordReset() {
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
    console.log("email: ", values.email);

    console.log("calling api");
    await fetch("http://localhost:3000/api/auth/request-password-reset", {
      method: "POST",
      body: JSON.stringify(values.email),
    }).then((res) => {
      if (res.status === 200) router.push("/request-password-reset/succesful");
      else console.log("mail failed to send.");
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
      <Input
        id="email"
        type="text"
        placeholder="Email"
        register={register}
        Icon={AiOutlineUser}
      />

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
