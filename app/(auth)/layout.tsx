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
              <div className="hidden 2xl:flex 2xl:flex-col 2xl:gap-5 2xl:items-start px-4">
                <p className="text-xl  max-w-xl">
                  Bun venit pe cel mai complet site web de recenzii pentru
                  căminele studențești ale universităților din România! Aici vei
                  găsi informații detaliate și fotografii despre diverse cămine
                  universitare din țară. Citește părerile autentice ale
                  studenților care au fost sau sunt încă cazați în aceste cămine
                  și citește despre viața pe care au avut-o și experiențele pe
                  care le-au trăit pe durata șederii.
                </p>
                <p className="text-xl max-w-xl">
                  De la atmosfera din camere și facilități, până la viața
                  socială și de noapte, vei descoperi tot ce trebuie să știi
                  pentru a lua o decizie informată în privința cazării tale. În
                  plus, poți contribui și tu la comunitatea noastră prin
                  adăugarea propriei tale recenzii.
                </p>
                <p className="text-xl max-w-xl">
                  Alege cu încredere căminul potrivit și trăiește o experiență
                  studențească de neuitat!
                </p>
              </div>
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
