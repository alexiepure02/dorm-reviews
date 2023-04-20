"use client";

import { useState } from "react";
import { Controller, FieldValues, UseFormRegister } from "react-hook-form";
import { AiFillStar } from "react-icons/ai";

interface RatingProps {
  rating: number;
  onClick: (rating: number) => void;
  variant?: number;
  decimals?: number;
  disableTooltip?: boolean;
}
export default ({
  rating,
  onClick,
  variant = 3,
  decimals = 0,
  disableTooltip = false,
}: RatingProps) => {
  const [hover, setHover] = useState(0);

  let starClassName: string;
  let tooltipFontSize: string;

  switch (variant) {
    case 1:
      starClassName = "w-12 h12";
      tooltipFontSize = "text-4xl";
      break;
    case 2:
      starClassName = "w-8 h-8";
      tooltipFontSize = "text-xl";
      break;
    case 3:
      starClassName = "w-6 h-6";
      tooltipFontSize = "text-base";
      break;
    default:
      starClassName = "w-6 h-6";
      tooltipFontSize = "text-base";
      break;
  }

  return (
    <div className="flex items-center">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={`${starClassName} ${
              index <= (hover || rating) ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => {
              onClick(index);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <AiFillStar className="w-full h-full" />
          </button>
        );
      })}
      {!disableTooltip && (
        <div
          className={`rounded-md bg-gray-600 text-white p-1.5 ml-3 ${tooltipFontSize}`}
        >
          {(Math.round(rating * 100) / 100).toFixed(decimals)}
        </div>
      )}
    </div>
  );
};
