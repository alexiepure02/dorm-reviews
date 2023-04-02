"use client";

import { useRouter } from "next/navigation";
import { BiMapPin } from "react-icons/bi";
import { UNIVERSITY_CARD_TYPE_ENUM } from "../common/Constants";

interface DormCardProps {
  dorm: any;
}

export default ({ dorm }: DormCardProps) => {
  const router = useRouter();

  const goToDorm = () => router.push("dorms/" + dorm._id);

  return (
    <div
      className="flex shadow-lg rounded-2xl gap-2 cursor-pointer transition duration-500 hover:bg-hover hover:-translate-y-2 max-w-[342px] flex-col"
      onClick={goToDorm}
    >
      <img src="/dorm.jpg" alt="University" className="rounded-t-2xl" />
      <div className="flex flex-col p-6 gap-1">
        <h1 className="text-3xl font-semibold text-secondary-green">
          {dorm.name}
        </h1>
        <p>{dorm.description}</p>
      </div>
    </div>
  );
};
