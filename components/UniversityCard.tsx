import { BiMapPin } from "react-icons/bi";
import { UNIVERSITY_CARD_TYPE_ENUM } from "../common/Constants";

interface UniversityCardProps {
  type?: UNIVERSITY_CARD_TYPE_ENUM;
}

export default ({ type }: UniversityCardProps) => {
  let typeClassName: string;

  if (type === UNIVERSITY_CARD_TYPE_ENUM.vertical) {
    typeClassName = "max-w-[342px] flex-col";
  } else {
    typeClassName = "items-center";
  }

  return (
    <div
      className={
        "flex shadow-lg rounded-2xl gap-2 cursor-pointer transition duration-500 hover:bg-hover hover:-translate-y-2 " +
        typeClassName
      }
    >
      <img src="university.jpg" alt="University" className="rounded-t-2xl" />
      <div className="flex flex-col p-6 gap-1">
        <h1 className="text-4xl font-semibold text-secondary-green">
          University Name
        </h1>
        <div className="flex items-center gap-2 text-gray-3">
          <BiMapPin className="w-6 h-6" />
          <p className="text-lg">Timisoara</p>
        </div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged
        </p>
      </div>
    </div>
  );
};
