"use client";

import Button from "@/components/Button";
import { signOut, useSession } from "next-auth/react";

export default async function Page() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-52">
      {session !== null ? (
        session !== undefined ? (
          <>
            <h1>You're logged in as: {session.user?.name}</h1>
            <Button className="w-52" onClick={() => signOut()}>
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
