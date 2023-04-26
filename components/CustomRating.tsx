import { AiFillStar } from "react-icons/ai";

interface RatingProps {
  rating: number;
  variant?: number;
  disableTooltip?: boolean;
  decimals?: number;
}
export default ({
  rating,
  variant = 3,
  disableTooltip = false,
  decimals = 0,
}: RatingProps) => {
  let starClassName: string;
  let tooltipFontSize: string;

  switch (variant) {
    case 1:
      starClassName = "w-8 h-8 sm:w-12 sm:h-12";
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
            disabled
            key={index}
            className={`${starClassName} ${
              index <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
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
