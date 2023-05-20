"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillStar } from "react-icons/ai";

interface DormCardProps {
  dorm: any;
}

export default ({ dorm }: DormCardProps) => {
  const router = useRouter();

  return (
    <Link
      href={"dorms/" + dorm.dorm._id}
      className="flex shadow-lg rounded-2xl gap-2 cursor-pointer transition duration-500 hover:bg-hover hover:-translate-y-2 max-w-[342px] flex-col"
    >
      <img src="/dorm.jpg" alt="dorm" className="rounded-t-2xl" />
      <div className="flex p-6 justify-between">
        <h1 className="text-3xl font-semibold text-secondary-green">
          {dorm.dorm.name}
        </h1>
        <div className="flex gap-1.5 items-end">
          {dorm.numberOfReviews !== 0 ? (
            <>
              <AiFillStar className="w-full h-full text-yellow-500" />
              <div className="rounded-md bg-gray-600 text-white text-xl p-1.5">
                {(Math.round(dorm.generalRating * 100) / 100).toFixed(1)}
              </div>
              <h1 className="text-xl font-semibold text-secondary-green ml-0.5">
                ({dorm.numberOfReviews})
              </h1>
            </>
          ) : (
            <>
              <AiFillStar className="w-full h-full text-yellow-500" />
              <div className="rounded-md bg-gray-600 text-white text-xl p-1.5">
                {(Math.round(dorm.generalRating * 100) / 100).toFixed(0)}
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
