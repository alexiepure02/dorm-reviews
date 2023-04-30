"use client";

import { useState } from "react";
import Pagination from "./Pagination";
import ReviewCard from "./ReviewCard";

interface ReviewCardProps {
  reviews: any;
  showDormNames?: boolean;
  page: number;
  pageCount: number;
  limit: number;
  handlePage: (page: number) => void;
}

export default ({
  reviews,
  showDormNames = false,
  page,
  pageCount,
  limit,
  handlePage,
}: ReviewCardProps) => {
  const [expandedId, setExpandedId] = useState(-1);

  const handleExpand = (id: number) => {
    if (expandedId === id) setExpandedId(-1);
    else setExpandedId(id);
  };

  return (
    <div className="container mx-auto flex flex-col break-words gap-8 px-4">
      {reviews.length ? (
        <>
          {reviews.map((review: any, index: number) => (
            <ReviewCard
              key={index}
              review={review}
              expandedId={expandedId}
              handleExpand={handleExpand}
              showDormName={showDormNames}
            />
          ))}
          <Pagination
            canPreviousPage={true}
            canNextPage={true}
            pageCount={Math.ceil(pageCount / limit)}
            pageIndex={page}
            gotoPage={handlePage}
          />
        </>
      ) : (
        <h1>Nu sunt recenzii aici.</h1>
      )}
    </div>
  );
};
