"use client";

import { useState } from "react";
import ReviewCard from "./ReviewCard";

interface ReviewCardProps {
  reviews: any;
}

export default ({ reviews }: ReviewCardProps) => {
  const [expandedId, setExpandedId] = useState(-1);

  const handleExpand = (id: number) => {
    if (expandedId === id) setExpandedId(-1);
    else setExpandedId(id);
  };

  return (
    <div className="flex flex-col gap-8">
      {reviews.map((review: any, index: number) => (
        <ReviewCard
          key={index}
          review={review}
          expandedId={expandedId}
          handleExpand={handleExpand}
        />
      ))}
    </div>
  );
};
