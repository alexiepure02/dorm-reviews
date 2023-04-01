import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiBuildings, BiMapAlt, BiPencil, BiUser } from "react-icons/bi";
import Button from "./Button";

export default () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 bg-white flex justify-between px-8 py-3 m-0 z-50 rounded-b-md shadow-md">
      <Link href={"/"} className="flex gap-4 items-center cursor-pointer">
        <img src="logo.svg" className="w-14 h-16" />
        <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-linear-1 to-linear-2">
          Căminul Tău
        </h1>
      </Link>
      <div className="hidden md:flex gap-8 items-center">
        <Link
          href={"/reviews"}
          className={`flex gap-2 font-semibold hover:text-primary-100 ${
            pathname === "/reviews" && "text-primary-100"
          }`}
        >
          <BiPencil
            className={`w-6 h-6 text-gray-3 ${
              pathname === "/reviews" && "text-primary-100"
            }`}
          />
          Recenzii
        </Link>
        <Link
          href={"/locations"}
          className={`flex gap-2 font-semibold hover:text-primary-100 ${
            pathname === "/locations" && "text-primary-100"
          }`}
        >
          <BiMapAlt
            className={`w-6 h-6 text-gray-3 ${
              pathname === "/locations" && "text-primary-100"
            }`}
          />
          Hartă
        </Link>
        <Link
          href={"/universities"}
          className={`flex gap-2 font-semibold hover:text-primary-100 ${
            pathname === "/universities" && "text-primary-100"
          }`}
        >
          <BiBuildings
            className={`w-6 h-6 text-gray-3 ${
              pathname === "/universities" && "text-primary-100"
            }`}
          />
          Universități
        </Link>
        {session ? (
          <Link
            href={"/account"}
            className={`flex gap-2 font-semibold hover:text-primary-100 ${
              pathname === "/account" && "text-primary-100"
            }`}
          >
            <BiUser
              className={`w-6 h-6 text-gray-3 ${
                pathname === "/account" && "text-primary-100"
              }`}
            />
            {session.user?.name}
          </Link>
        ) : (
          <Button className="w-[200px]">
            <Link href={"/login"}>Autentificare</Link>
          </Button>
        )}
      </div>
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
