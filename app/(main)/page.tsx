"use client";

import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const filler = Array.from(Array(50).keys());

  return (
    <div className="bg-background">
      <h1>Home Page</h1>
      {session ? (
        <>
          Signed in as {session?.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
      {filler.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
};

export default Home;
