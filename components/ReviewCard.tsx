import { useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import Rating from "./Rating";

interface ReviewCardProps {
  reviewId: number;
  expandedId: number;
  handleExpand: (id: number) => void;
}
export default ({ reviewId, expandedId, handleExpand }: ReviewCardProps) => {
  const review = {
    id: 1,
    name: "John Doe",
    overallRating: 3.6,
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    room: 5,
    bathroom: 3,
    kitchen: 4.7,
    location: 2,
  };

  // other logic

  // Optinal callback functions
  // const onPointerEnter = () => console.log("Enter");
  // const onPointerLeave = () => console.log("Leave");
  // const onPointerMove = (value: number, index: number) =>
  //   console.log(value, index);

  return (
    <div className="flex flex-col shadow-lg rounded-2xl px-4 sm:px-9 py-6 gap-4">
      <div className="flex">
        <div className="flex gap-4">
          <img
            src="avatar.svg"
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
          onClick={() => handleExpand(reviewId)}
        >
          {expandedId === reviewId ? (
            <BiUpArrow className="w-5 h-5" />
          ) : (
            <BiDownArrow className="w-5 h-5" />
          )}
        </div>
      </div>
      <p className=" text-lg">{review.comment}</p>
      <div className="flex gap-4">
        <img
          src="dorm.jpg"
          alt="Dorm"
          className="align-middle w-14 h-14 cursor-pointer"
          onClick={() => console.log("open dorm pic.")}
        />
        <img
          src="dorm.jpg"
          alt="Dorm"
          className="align-middle w-14 h-14 cursor-pointer"
          onClick={() => console.log("open dorm pic.")}
        />
        <img
          src="dorm.jpg"
          alt="Dorm"
          className="align-middle w-14 h-14 cursor-pointer"
          onClick={() => console.log("open dorm pic.")}
        />
        <img
          src="dorm.jpg"
          alt="Dorm"
          className="align-middle w-14 h-14 cursor-pointer"
          onClick={() => console.log("open dorm pic.")}
        />
      </div>
      <div
        className={` overflow-hidden transition-[max-height] duration-300 ${
          expandedId === reviewId ? " max-h-52" : "max-h-0"
        }`}
        id="collapseExample"
        data-te-collapse-item
      >
        <div className="flex flex-col gap-2 w-64">
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Cameră</h1>
            <Rating initialValue={review.room} showTooltip={true} />
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Baie</h1>
            <Rating initialValue={review.bathroom} showTooltip={true} />
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Bucătărie</h1>
            <Rating initialValue={review.kitchen} showTooltip={true} />
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Locație</h1>
            <Rating initialValue={review.location} showTooltip={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
