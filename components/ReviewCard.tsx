import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import CustomRating from "./CustomRating";

interface ReviewCardProps {
  review: any;
  expandedId: number;
  handleExpand: (id: number) => void;
}
export default ({ review, expandedId, handleExpand }: ReviewCardProps) => {
  const handleExpandClick = () => handleExpand(review._id);

  return (
    <div className="flex flex-col shadow-lg rounded-2xl px-4 sm:px-9 py-6 gap-4">
      <div className="flex">
        <div className="flex gap-4">
          <img
            src="/avatar.svg"
            alt="Avatar"
            className="align-middle w-14 h-14 rounded-full"
          />
          <div>
            <h1 className=" text-xl">{review.user.username}</h1>
            <CustomRating rating={review.overallRating} />
          </div>
        </div>
        <div
          className="self-start p-2 ml-auto rounded-full transition duration-200 hover:bg-hover cursor-pointer"
          onClick={handleExpandClick}
        >
          {expandedId === review._id ? (
            <BiUpArrow className="w-5 h-5" />
          ) : (
            <BiDownArrow className="w-5 h-5" />
          )}
        </div>
      </div>
      <p className=" text-lg text-ellipsis">{review.comment}</p>
      <div className="flex gap-4">
        <img
          src="/dorm.jpg"
          alt="Dorm"
          className="align-middle w-14 h-14 cursor-pointer"
          onClick={() => console.log("open dorm pic.")}
        />
        <img
          src="/dorm.jpg"
          alt="Dorm"
          className="align-middle w-14 h-14 cursor-pointer"
          onClick={() => console.log("open dorm pic.")}
        />
        <img
          src="/dorm.jpg"
          alt="Dorm"
          className="align-middle w-14 h-14 cursor-pointer"
          onClick={() => console.log("open dorm pic.")}
        />
        <img
          src="/dorm.jpg"
          alt="Dorm"
          className="align-middle w-14 h-14 cursor-pointer"
          onClick={() => console.log("open dorm pic.")}
        />
      </div>
      <div
        className={` overflow-hidden transition-[max-height] duration-300 ${
          expandedId === review._id ? " max-h-full" : "max-h-0"
        }`}
        id="collapseExample"
        data-te-collapse-item
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="w-64 flex items-center justify-between">
            <h1 className="text-lg font-bold">Cameră</h1>
            <CustomRating rating={review.roomRating} />
          </div>
          <p>{review.roomComment}</p>
          <div className="w-64 flex items-center justify-between">
            <h1 className="text-lg font-bold">Baie</h1>
            <CustomRating rating={review.bathRating} />
          </div>
          <p>{review.bathComment}</p>
          <div className="w-64 flex items-center justify-between">
            <h1 className="text-lg font-bold">Bucătărie</h1>
            <CustomRating rating={review.kitchenRating} />
          </div>
          <p>{review.kitchenComment}</p>
          <div className="w-64 flex items-center justify-between">
            <h1 className="text-lg font-bold">Locație</h1>
            <CustomRating rating={review.locationRating} />
          </div>
          <p>{review.locationComment}</p>
        </div>
      </div>
    </div>
  );
};
