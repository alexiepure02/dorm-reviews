import { useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import Rating from "./Rating";

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
            <h1 className=" text-xl">{review.name}</h1>
            <Rating initialValue={review.overallRating} showTooltip={true} />
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
      <p className=" text-lg">{review.comment}</p>
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
        <div className="flex flex-col gap-2 w-64">
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Cameră</h1>
            <Rating initialValue={review.roomRating} showTooltip={true} />
          </div>
          <p>{review.roomComment}</p>
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Baie</h1>
            <Rating initialValue={review.bathRating} showTooltip={true} />
          </div>
          <p>{review.bathComment}</p>
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Bucătărie</h1>
            <Rating initialValue={review.kitchenRating} showTooltip={true} />
          </div>
          <p>{review.kitchenComment}</p>
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Locație</h1>
            <Rating initialValue={review.locationRating} showTooltip={true} />
          </div>
          <p>{review.locationComment}</p>
        </div>
      </div>
    </div>
  );
};
