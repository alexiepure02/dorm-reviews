"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiBuildings, BiMapAlt, BiPencil, BiUserCircle } from "react-icons/bi";

import Button from "./Button";
import Sidebar from "./Sidebar";
import SearchInput from "./SearchInput";
import Logo from "/public/logo.svg";
import Image from "next/image";

export default () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <>
      <Sidebar />
      <header className="sticky top-0 bg-white flex justify-between px-8 py-3 m-0 z-50 rounded-b-xl shadow-md">
        <Link href="/" className="flex gap-4 items-center cursor-pointer">
          <Image src={Logo} alt="Logo" className="w-14 h-16" />
          <h1 className="hidden sm:block font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-linear-1 to-linear-2">
            Căminul Tău
          </h1>
        </Link>
        <div
          className={`hidden ${
            pathname !== "/" ? "xl:flex" : "lg:flex"
          } gap-8 items-center`}
        >
          {pathname !== "/" && (
            <div>
              <SearchInput header />
            </div>
          )}
          <Link
            href="/locations"
            className={`flex gap-2 font-semibold text-gray-3 hover:text-primary-100 ${
              pathname === "/locations" && "text-primary-100"
            }`}
          >
            <BiMapAlt
              className={`w-6 h-6 ${
                pathname === "/locations" && "text-primary-100"
              }`}
            />
            Hartă
          </Link>
          <Link
            href="/universities"
            className={`flex gap-2 font-semibold text-gray-3 hover:text-primary-100 ${
              pathname === "/universities" && "text-primary-100"
            }`}
          >
            <BiBuildings
              className={`w-6 h-6 ${
                pathname === "/universities" && "text-primary-100"
              }`}
            />
            Universități
          </Link>

          <Link
            href="/my-reviews"
            className={`flex gap-2 font-semibold text-gray-3 hover:text-primary-100 ${
              pathname === "/my-reviews" && "text-primary-100"
            }`}
          >
            <BiPencil
              className={`w-6 h-6 ${
                pathname === "/my-reviews" && "text-primary-100"
              }`}
            />
            Recenziile mele
          </Link>

          {session !== null ? (
            session !== undefined ? (
              <Link
                href="/account"
                className={`flex items-center gap-2 font-semibold text-gray-3 hover:text-primary-100 ${
                  pathname === "/account" && "text-primary-100"
                }`}
              >
                <BiUserCircle
                  className={`w-6 h-6 ${
                    pathname === "/account" && "text-primary-100"
                  }`}
                />
                Contul meu
              </Link>
            ) : (
              <div className="flex items-center gap-2 font-semibold text-gray-3 hover:text-primary-100">
                <BiUserCircle
                  className={`w-6 h-6 ${
                    pathname === "/account" && "text-primary-100"
                  }`}
                />
                Contul meu
              </div>
            )
          ) : (
            <Button className="px-10">
              <Link href="/login">Autentificare</Link>
            </Button>
          )}
        </div>
      </header>
    </>
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
