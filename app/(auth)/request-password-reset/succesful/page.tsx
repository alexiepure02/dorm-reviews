"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { BiMailSend } from "react-icons/bi";

export default function RequestPasswordResetSuccesful() {
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
