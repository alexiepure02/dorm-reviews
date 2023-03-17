interface ReviewCardProps {}
import { useState } from "react";
import ReviewCard from "./ReviewCard";

export default ({}: ReviewCardProps) => {
  const [expandedId, setExpandedId] = useState(-1);

  const handleExpand = (id: number) => {
    if (expandedId === id) setExpandedId(-1);
    else setExpandedId(id);
  };

  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: 20 }, (_, index: number) => (
        <ReviewCard
          key={index}
          reviewId={index}
          expandedId={expandedId}
          handleExpand={handleExpand}
        />
      ))}
    </div>
  );
};
