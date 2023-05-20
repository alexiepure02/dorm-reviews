"use client";

import fetcher from "@/common/utils/functions";
import Button from "@/components/Button";
import ReviewsSection from "@/components/ReviewsSection";
import { useState } from "react";
import useSWR from "swr";

interface ReviewsListSectionProps {
  dormId: string;
}

export default function ReviewsListSection({
  dormId,
}: ReviewsListSectionProps) {
  const [success, setSuccess] = useState<string[]>([]);
  const [error, setError] = useState<string[]>([]);
  const [checkedReviewIds, setCheckedReviewIds] = useState<string[]>([]);
  const [revalidate, setRevalidate] = useState(false);

  const {
    data,
    error: err,
    isLoading,
  } = useSWR<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dorms/${dormId}`,
    fetcher
  );
  const checkId = (reviewId: string) => {
    setCheckedReviewIds([...checkedReviewIds, reviewId]);
  };

  const uncheckId = (reviewId: string) => {
    setCheckedReviewIds(checkedReviewIds.filter((id) => id !== reviewId));
  };

  const handleRevalidation = () => setRevalidate(true);

  const handleRemove = async () => {
    const successes: string[] = [];
    const errors: string[] = [];

    checkedReviewIds.forEach(async (id) => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          successes.push(`Recenzia ${id} ștearsă cu succes`);
        } else {
          errors.push(`Eroare la ștergerea recenziei ${id}`);
        }
      });
    });

    setSuccess(successes);
    setError(errors);
    setCheckedReviewIds([]);
    handleRevalidation();
  };

  return (
    data && (
      <>
        <ReviewsSection
          admin
          revalidate={revalidate}
          showAddReviewButton={false}
          dorm={data.dorm.name}
          checkedReviewIds={checkedReviewIds}
          checkId={checkId}
          uncheckId={uncheckId}
        />
        {success.length !== 0 &&
          success.map((msg: any, index: number) => (
            <h1 key={index} className="text-green-500">
              {msg}
            </h1>
          ))}
        {error.length !== 0 &&
          error.map((msg: any, index: number) => (
            <h1 key={index} className="text-red-500">
              {msg}
            </h1>
          ))}
        {checkedReviewIds.length !== 0 && (
          <>
            <h1 className="text-2xl font-semibold">Recenzii selectate</h1>
            {checkedReviewIds.map((review: any, index: number) => (
              <h1 key={index}>{review}</h1>
            ))}

            <Button className="mt-2 px-6" onClick={handleRemove}>
              Șterge recenziile selectate
            </Button>
          </>
        )}
      </>
    )
  );
}
