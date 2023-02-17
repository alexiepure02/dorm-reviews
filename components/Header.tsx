import { useSession, signIn, signOut } from "next-auth/react";

export default () => {
  const { data: session } = useSession();
  return (
    <header>
      <h1>aaa</h1>
    </header>
  );
  // if (session) {
  //   console.log(session);
  //   return (
  //     <>
  //       Signed in as {session?.user?.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }
  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // );
};
