"use client";

import { REVIEW_PER_PAGE_LIMIT } from "@/common/Constants";
import { useState } from "react";
import Pagination from "./Pagination";
import ReviewCard from "./ReviewCard";

interface ReviewCardProps {
  admin?: boolean;
  reviews: any;
  showDormNames?: boolean;
  page: number;
  totalReviews: number;
  handlePage: (page: number) => void;
  checkedReviewIds?: string[];
  checkId?: (reviewId: string) => void;
  uncheckId?: (reviewId: string) => void;
}

export default ({
  admin = false,
  reviews,
  showDormNames = false,
  page,
  totalReviews,
  handlePage,
  checkedReviewIds,
  checkId,
  uncheckId,
}: ReviewCardProps) => {
  const [expandedId, setExpandedId] = useState(-1);

  const handleExpand = (id: number) => {
    if (expandedId === id) setExpandedId(-1);
    else setExpandedId(id);
  };

  return (
    <div className="w-full max-w-screen-2xl 2xl:mx-auto flex flex-col break-words gap-8 py-8 px-4 md:px-8 lg:px-12">
      {reviews.length ? (
        <>
          {reviews.map((review: any, index: number) =>
            admin && checkedReviewIds && checkId && uncheckId ? (
              <div
                key={index}
                className="flex items-center justify-start gap-2"
              >
                <input
                  id={review._id}
                  type="checkbox"
                  checked={checkedReviewIds.includes(review._id)}
                  onChange={(e) =>
                    checkedReviewIds.includes(review._id)
                      ? uncheckId(review._id)
                      : checkId(review._id)
                  }
                />
                <ReviewCard
                  key={index}
                  review={review}
                  expandedId={expandedId}
                  handleExpand={handleExpand}
                  showDormName={showDormNames}
                />
              </div>
            ) : (
              <ReviewCard
                key={index}
                review={review}
                expandedId={expandedId}
                handleExpand={handleExpand}
                showDormName={showDormNames}
              />
            )
          )}

          {totalReviews > REVIEW_PER_PAGE_LIMIT && (
            <Pagination
              canPreviousPage={true}
              canNextPage={true}
              pageCount={Math.ceil(totalReviews / REVIEW_PER_PAGE_LIMIT)}
              pageIndex={page}
              gotoPage={handlePage}
            />
          )}
        </>
      ) : (
        <h1>
          Nu sunt recenzii aici.{" "}
          {!showDormNames && "Fii primul care scrie o recenzie acestui cămin."}
        </h1>
      )}
    </div>
  );
};
