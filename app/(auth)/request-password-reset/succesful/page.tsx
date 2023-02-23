"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { BiLockOpen, BiMailSend, BiUserPin } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

export default function RequestPasswordResetSuccesful() {
  const router = useRouter();

  const redirectToHome = () => {
    // TODO: redirect to a success register page
    console.log("rediect to home");
    router.push("/");
  };

  return (
    <div className="flex flex-col grow max-w-[360px] gap-4">
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
        Mail-ul pentru resetarea parolei a fost trimis cu succes.
      </p>

      <Button type="button">
        <Link href={"/login"}>Înapoi la autentificare</Link>
      </Button>
    </div>
  );
}
