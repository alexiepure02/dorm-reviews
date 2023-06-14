import SearchInput from "@/components/SearchInput";
import TopUniversities from "@/components/TopUniversities";
import HomeBackground from "/public/home-bg.png";
import Image from "next/image";

export default async function Page() {
  return (
    <>
      <Image
        src={HomeBackground}
        alt="Home Background"
        className="absolute w-full h-screen object-cover -z-50 -top-0.5"
      />
      <div className=" max-w-screen-2xl 2xl:mx-auto h-full px-9">
        <div className="h-screen">
          <div className="h-2/3 flex flex-col items-center justify-center text-center gap-8 text-white">
            <div className="flex flex-col gap-4 ">
              <h1 className="text-6xl sm:text-8xl tracking-tight font-bold">
                Căminul Tău
              </h1>
            </div>
            <p className="max-w-2xl">
              Some catchy phrase or like a slogan or something..
            </p>
            <SearchInput autoFocus />
          </div>
        </div>
        <div className="flex flex-col gap-2 py-4">
          <h1 className="text-5xl">Universități</h1>
          <p className="max-w-screen-md">
            Cele mai populare universități din țară...
          </p>
          {/* @ts-expect-error Server Component */}
          <TopUniversities />
        </div>
      </div>
    </>
  );
}
