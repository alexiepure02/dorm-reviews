"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export default function Header() {
  // const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return <h1>Header</h1>;
}
