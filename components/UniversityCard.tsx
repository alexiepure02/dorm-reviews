import { BiMapPin } from "react-icons/bi";
import { UNIVERSITY_CARD_TYPE_ENUM } from "../common/Constants";
import Link from "next/link";
import { CardImage } from "./CardImage";

interface UniversityCardProps {
  type?: UNIVERSITY_CARD_TYPE_ENUM;
  university: any;
}

export default ({
  type = UNIVERSITY_CARD_TYPE_ENUM.horizontal,
  university,
}: UniversityCardProps) => {
  let typeClassName: string;

  if (type === UNIVERSITY_CARD_TYPE_ENUM.vertical) {
    typeClassName = "w-full max-w-[342px] flex-col";

    university.description =
      university.description.substring(0, university.description.indexOf(".")) +
      ".";
  } else {
    typeClassName =
      "w-full max-w-[342px] flex-col sm:flex-row sm:max-w-[741px] sm:items-center";

    university.description = "";
  }

  return (
    <Link
      href={"universities/" + university._id}
      className={
        "flex shadow-lg rounded-2xl gap-2 cursor-pointer transition duration-500 hover:bg-hover hover:-translate-y-2 overflow-hidden " +
        typeClassName
      }
    >
      <CardImage
        name={university._id}
        fallback="/not-found-university.png"
        alt="University"
        className={
          type === UNIVERSITY_CARD_TYPE_ENUM.vertical
            ? "w-full h-[250px]"
            : "w-full h-[250px] sm:w-[250px] sm:h-[180px]"
        }
      />
      <div
        className={`flex flex-col p-6 gap-1 ${
          type === UNIVERSITY_CARD_TYPE_ENUM.vertical
            ? "w-full"
            : "w-full sm:w-3/5"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl font-semibold text-secondary-green">
          {university.name + " (" + university.acronym + ")"}
        </h1>
        <div className="flex items-center gap-2 text-gray-4">
          <BiMapPin className="w-6 h-6" />
          <p className="text-lg">{university.location.name}</p>
        </div>
        <p>{university.description}</p>
      </div>
    </Link>
  );
};
