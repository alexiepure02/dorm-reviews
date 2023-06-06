import Link from "next/link";
import "../globals.css";
import authBackground from "/public/auth-bg.png";
import authBackgroundMobile from "/public/auth-bg-mobile.png";

import Image from "next/image";
import SessionProvider from "@/contexts/SessionProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-screen h-screen bg-background">
        <Image
          src={authBackground}
          className="hidden 2xl:block fixed min-w-screen min-h-screen -z-50"
          alt="Auth Background"
        />
        <Image
          src={authBackgroundMobile}
          className="block 2xl:hidden fixed min-w-screen min-h-screen w-screen -z-50"
          alt="Auth Background Mobile"
        />
        <div className="flex h-full flex-col 2xl:flex-row items-start 2xl:items-center justify-center 2xl:justify-between gap-8">
          <div className=" flex text-background w-full 2xl:max-w-[848px] justify-center 2xl:justify-end">
            <div className="flex flex-col items-center 2xl:items-start grow gap-8 max-w-2xl">
              <Link
                href="/"
                className="text-7xl sm:text-8xl font-bold px-4 py-2 hover:bg-white hover:bg-opacity-25 hover:rounded-xl text-center"
              >
                Căminul Tău
              </Link>
              <p className="hidden 2xl:block text-lg max-w-xl px-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of
              </p>
            </div>
          </div>
          <div className="w-full 2xl:max-w-[600px] flex justify-center px-4">
            <div className="w-full max-w-[424px] bg-background 2xl:bg-transparent py-4 px-8 rounded-lg bg-opacity-80">
              <SessionProvider>{children}</SessionProvider>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
