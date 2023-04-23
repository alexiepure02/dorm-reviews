"use client";

import { useRouter } from "next/navigation";
import { BiMapPin } from "react-icons/bi";
import { UNIVERSITY_CARD_TYPE_ENUM } from "../common/Constants";

interface UniversityCardProps {
  type?: UNIVERSITY_CARD_TYPE_ENUM;
  university: any;
}

export default ({ type, university }: UniversityCardProps) => {
  let typeClassName: string;
  let imageClassName: string;

  if (type === UNIVERSITY_CARD_TYPE_ENUM.vertical) {
    typeClassName = "max-w-[342px] flex-col";
    imageClassName = "rounded-t-2xl";
  } else {
    typeClassName =
      "max-w-[342px] flex-col sm:flex-row sm:max-w-[741px] sm:items-center";
    imageClassName = "rounded-t-2xl sm:w-1/3 sm:rounded-l-2xl";
    university.description = "";
  }
  const router = useRouter();

  const goToUniversity = () => router.push("universities/" + university._id);

  return (
    <div
      className={
        "flex shadow-lg rounded-2xl gap-2 cursor-pointer transition duration-500 hover:bg-hover hover:-translate-y-2 " +
        typeClassName
      }
      onClick={goToUniversity}
    >
      <img src="/university.jpg" alt="University" className={imageClassName} />
      <div className="flex flex-col p-6 gap-1">
        <h1 className="text-2xl sm:text-3xl font-semibold text-secondary-green">
          {university.name}
        </h1>
        <div className="flex items-center gap-2 text-gray-3">
          <BiMapPin className="w-6 h-6" />
          <p className="text-lg">{university.location.name}</p>
        </div>
        <p>{university.description}</p>
      </div>
    </div>
  );
};
