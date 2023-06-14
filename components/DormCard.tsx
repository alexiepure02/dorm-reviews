"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillStar } from "react-icons/ai";
import { CardImage } from "./CardImage";

interface DormCardProps {
  dorm: any;
}

export default ({ dorm }: DormCardProps) => {
  const router = useRouter();

  return (
    <Link
      href={"/dorms/" + dorm.dorm._id}
      className="w-full flex shadow-lg rounded-2xl gap-2 cursor-pointer transition duration-500 hover:bg-hover hover:-translate-y-2 max-w-[342px] flex-col overflow-hidden"
    >
      <CardImage
        name={dorm.dorm._id}
        fallback="/not-found-dorm.png"
        alt="Dorm"
        className="w-full h-[250px]"
      />
      <div className="flex p-6 justify-between">
        <h1 className="text-2xl lg:text-3xl font-semibold text-secondary-green">
          {dorm.dorm.name}
        </h1>
        <div className="flex gap-1.5 items-end">
          {dorm.numberOfReviews !== 0 ? (
            <>
              <AiFillStar className="w-full h-full text-yellow-500" />
              <div className="text-lg lg:text-xl rounded-md bg-gray-600 text-white p-1.5">
                {(Math.round(dorm.generalRating * 100) / 100).toFixed(1)}
              </div>
              <h1 className="text-lg lg:text-xl font-semibold text-secondary-green ml-0.5">
                ({dorm.numberOfReviews})
              </h1>
            </>
          ) : (
            <>
              <AiFillStar className="w-full h-full text-yellow-500" />
              <div className="text-lg lg:text-xl rounded-md bg-gray-600 text-white p-1.5">
                {(Math.round(dorm.generalRating * 100) / 100).toFixed(0)}
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
