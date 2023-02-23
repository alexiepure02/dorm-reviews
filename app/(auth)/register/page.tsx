"use client";

import Head from "next/head";
// import Layout from '../layout/layout'
import Link from "next/link";
import Image from "next/image";
// import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
// import { useFormik } from 'formik';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiLock, BiLockOpen, BiMailSend, BiUserPin } from "react-icons/bi";
import Input from "@/components/Input";
import { AiOutlineUser } from "react-icons/ai";
import Button from "@/components/Button";

export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false });

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (values: {
    username: string;
    email: string;
    password: string;
    cpassword: string;
  }) => {
    
    // validate password

    console.log("calling api");
    await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("error?", data);
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

      <Input
        id="username"
        type="text"
        placeholder="Nume de utilizator"
        register={register}
        Icon={AiOutlineUser}
      />

      <Input
        id="email"
        type="text"
        placeholder="Email"
        register={register}
        Icon={BiMailSend}
      />

      <Input
        id="password"
        type="password"
        placeholder="Parolă"
        register={register}
        Icon={BiLockOpen}
      />

      <Input
        id="cpassword"
        type="password"
        placeholder="Confirmă parola"
        register={register}
        Icon={BiLock}
      />

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
