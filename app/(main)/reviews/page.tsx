import Input from "@/components/Input";
import ReviewCard from "@/components/ReviewCard";
import ReviewCardsList from "@/components/ReviewCardsList";
import { NextPage } from "next";
import { IconBaseProps } from "react-icons";
import { BiSearchAlt } from "react-icons/bi";

async function getReviewsByUser(user: string) {
  const res = await fetch("http://localhost:3000/api/reviews?user=" + user);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ searchParams }) {
  const reviews = await getReviewsByUser(searchParams.user);
  
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
        <div className="flex flex-col gap-8">
          <ReviewCardsList reviews={reviews} />
        </div>
      </div>
    </>
  );
}
