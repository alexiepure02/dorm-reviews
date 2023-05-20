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
    <div className="flex flex-col gap-6 items-center justify-center h-52">
      {session !== null ? (
        session !== undefined ? (
          <>
            <h1>You're logged in as: {session.user?.name}</h1>
            {session.user?.role === Role.admin && (
              <Button className="w-52">
                <Link href={"/admin"}>Panou administrator</Link>
              </Button>
            )}
            <Button className="w-52" onClick={handleSignOut}>
              Sign out
            </Button>
          </>
        ) : (
          <h1>Loading...</h1>
        )
      ) : (
        <h1>You're not logged in.</h1>
      )}
    </div>
  );
}
