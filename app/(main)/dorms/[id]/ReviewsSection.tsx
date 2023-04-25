"use client";

import fetcher from "@/common/utils/functions";
import Input from "@/components/Input";
import Pagination from "@/components/Pagination";
import ReviewCard from "@/components/ReviewCard";
import ReviewCardsList from "@/components/ReviewCardsList";
import { NextPage } from "next";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IconBaseProps } from "react-icons";
import { BiSearchAlt } from "react-icons/bi";
import useSWR from "swr";
import AddReviewButton from "./AddReviewButton";

interface ReviewsSection {
  dorm: any;
}

export default function ReviewsSection({ dorm }: ReviewsSection) {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const limit = 3;

  const { data, error, isLoading } = useSWR<any>(
    `http://localhost:3000/api/reviews?dorm=${dorm}&page=${page}&limit=${limit}`,
    fetcher
  );

  if (
    data &&
    data.countReviews !== pageCount &&
    data.countReviews !== undefined
  )
    setPageCount(data.countReviews);

  const handlePage = (page: number) => setPage(page);

  return (
    <>
      <div className="container mx-auto">
        <div className="flex w-full justify-between p-4">
          <h1 className="text-4xl font-medium">Recenzii</h1>
          <AddReviewButton />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 pb-8">
        {data ? (
          data.reviews !== undefined ? (
            <>
              <ReviewCardsList reviews={data.reviews} />
              <Pagination
                canPreviousPage={true}
                canNextPage={true}
                pageCount={Math.ceil(pageCount / limit)}
                pageIndex={page}
                gotoPage={handlePage}
              />
            </>
          ) : (
            <h1 className="px-4 text-center">
              Acest cămin nu are încă recenzii. Fii tu primul care lasă o
              recenzie.
            </h1>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
