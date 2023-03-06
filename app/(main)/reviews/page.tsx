"use client";

import Input from "@/components/Input";
import ReviewCard from "@/components/ReviewCard";
import { NextPage } from "next";
import { IconBaseProps } from "react-icons";
import { BiSearchAlt } from "react-icons/bi";

const Reviews: NextPage = () => {
  return (
    <>
      <div className="h-[500px] flex flex-col items-center justify-center text-center gap-8 bg-background px-9">
        <h1 className="text-4xl">Scrie o recenzie..</h1>
        <p className="text-lg	max-w-xl">
          Împărtășește-ți povestea și ajută pe cineva să-și aleagă viitorul loc
          unde să locuiască în timpul studiilor
        </p>
        <Input
          Icon={BiSearchAlt}
          id="search"
          type="text"
          placeholder="Caută un cămin"
          classNameDiv="w-full max-w-3xl"
        />
      </div>
      <div className="container mx-auto flex flex-col gap-4 py-10 px-8">
        <h1 className=" text-5xl">Recenzile Tale</h1>
        <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-8">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>
    </>
  );
};

export default Reviews;
