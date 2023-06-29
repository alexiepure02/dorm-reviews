import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import CustomRating from "./CustomRating";
import OptionsButton from "./OptionsButton";
// import Avatar from "/public/avatar.svg";
// import Image from "next/image";
import useSWR from "swr";
import fetcher, { displayDate } from "@/common/utils/functions";
import ReviewImages from "./ReviewImages";

interface ReviewCardProps {
  review: any;
  expandedId: number;
  handleExpand: (id: number) => void;
  showDormName: boolean;
}

export default ({
  review,
  expandedId,
  handleExpand,
  showDormName,
}: ReviewCardProps) => {
  let imageUrls: string[] = [];

  if (review.imageIndexes.length !== 0) {
    const { data: images } = useSWR<any>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/image/${
        review.dorm._id
      }?${new URLSearchParams({ indexes: review.imageIndexes })}`,
      fetcher
    );

    if (images !== undefined) {
      imageUrls = images;
    }
  }

  const handleExpandClick = () => handleExpand(review._id);

  return (
    <div className="relative flex flex-col shadow-lg rounded-2xl px-4 sm:px-9 py-6 gap-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          {/* <Image
            src={Avatar}
            alt="Avatar"
            className="align-middle w-14 h-14 rounded-full"
          /> */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-3">
              <h1 className="text-xl font-semibold">
                {review.user.username}
                {showDormName && " - " + review.dorm.name}
              </h1>
              <h1 className="font-semibold text-gray-3">
                {displayDate(review.createdAt)}
              </h1>
            </div>
            <CustomRating rating={review.overallRating} decimals={1} />
          </div>
        </div>
        <div className="flex items-start">
          <div
            className="p-2 rounded-full transition duration-200 hover:bg-hover cursor-pointer"
            onClick={handleExpandClick}
          >
            {expandedId === review._id ? (
              <BiUpArrow className="w-5 h-5" />
            ) : (
              <BiDownArrow className="w-5 h-5" />
            )}
          </div>
          <OptionsButton reviewId={review._id} userId={review.user._id} />
        </div>
      </div>
      <p className=" whitespace-pre-line">{review.comment}</p>
      {imageUrls.length !== 0 && <ReviewImages images={imageUrls} />}
      <div
        className={` overflow-hidden transition-[max-height] duration-300 ${
          expandedId === review._id ? " max-h-full" : "max-h-0"
        }`}
        id="collapseExample"
        data-te-collapse-item
      >
        <div className="flex flex-col gap-2 w-full whitespace-pre-line">
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
