"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { BiLock } from "react-icons/bi";

export default function RequestPasswordResetSuccesful() {
  return (
    <div className="flex flex-col grow max-w-[360px] gap-4">
      <svg width="0" height="0">
        <linearGradient id="orange-gradient">
          <stop stopColor="#F64C18" offset="0%" />
          <stop stopColor="#EF9045" offset="100%" />
        </linearGradient>
      </svg>
      <BiLock
        className="self-center w-40 h-40"
        style={{ fill: "url(#orange-gradient)" }}
      />
      <p className="text-gray-2 text-center">Ai resetat parola cu succes.</p>

      <Button>
        <Link href={"/login"}>Înapoi la autentificare</Link>
      </Button>
    </div>
  );
}
