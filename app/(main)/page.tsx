"use client";

import { UNIVERSITY_CARD_TYPE_ENUM } from "@/common/Constants";
import Input from "@/components/Input";
import UniversityCard from "@/components/UniversityCard";
import { NextPage } from "next";
import { BiSearchAlt } from "react-icons/bi";

const Home: NextPage = () => {
  const filler = Array.from(Array(50).keys());

  return (
    <>
      <img
        src="home-bg.png"
        className="absolute w-full h-screen object-cover -z-50 -top-0.5"
      />
      <div className="h-full container mx-auto px-9">
        <div className="h-screen">
          <div className="h-2/3 flex flex-col items-center justify-center text-center gap-8 text-white">
            <div className="flex flex-col gap-4 ">
              {/* <h1 className="text-6xl tracking-tight font-bold">
                Bine ai venit
              </h1> */}
              <h1 className="text-8xl tracking-tight font-bold">Căminul Tău</h1>
            </div>
            <p className="max-w-2xl">
              Some catchy phrase or like a slogan or something..
            </p>
            <Input
              Icon={BiSearchAlt}
              id="search"
              type="text"
              placeholder="Caută un cămin"
              classNameDiv="w-full max-w-3xl text-black"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 py-10">
          <h1 className="text-5xl">Universități</h1>
          <p className="max-w-screen-md">
            Cele mai populare universități din țară..
          </p>
          <div className="grid py-8 gap-8 items-center justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* <UniversityCard type={UNIVERSITY_CARD_TYPE_ENUM.vertical} />
            <UniversityCard type={UNIVERSITY_CARD_TYPE_ENUM.vertical} />
            <UniversityCard type={UNIVERSITY_CARD_TYPE_ENUM.vertical} />
            <UniversityCard type={UNIVERSITY_CARD_TYPE_ENUM.vertical} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
