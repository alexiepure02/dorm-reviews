"use client";

import { Role } from "@/common/Constants";
import Button from "@/components/Button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AccountSection() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex justify-center p-6 md:p-10 lg:p-14">
      <div className="flex flex-col gap-6 items-center lg:items-start justify-center bg-background px-8 py-6 rounded-lg">
        <h1 className="text-3xl font-bold">Contul Tău</h1>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start justify-center">
          {session !== null ? (
            session !== undefined ? (
              <>
                <div className="flex flex-col gap-1">
                  <h1>Nume de utilizator:</h1>
                  <h1 className="text-xl font-bold">{session.user?.name}</h1>
                  <h1>Adresa de email:</h1>
                  <h1 className="text-xl font-bold">{session.user?.email}</h1>
                  {session.user?.role === Role.admin && (
                    <>
                      <h1>Rol:</h1>
                      <h1 className="text-xl font-bold">
                        {session.user?.role}
                      </h1>
                    </>
                  )}
                </div>
                <div className="flex flex-col self-center gap-4">
                  {session.user?.role === Role.admin && (
                    <Button className="px-4">
                      <Link href={"/admin"}>
                        Panou administrator
                      </Link>
                    </Button>
                  )}
                  <Button className="px-4">
                    <Link href={"/request-password-reset"}>
                      Resetare parolă
                    </Link>
                  </Button>
                  <Button className="px-4" onClick={handleSignOut}>
                    Deconectare
                  </Button>
                </div>
              </>
            ) : (
              <h1>Se încarcă...</h1>
            )
          ) : (
            <div className="flex flex-col gap-6">
              <h1>Nu ești autentificat.</h1>
              <Button className="px-10">
                <Link href="/login">
                  Autentificare
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
