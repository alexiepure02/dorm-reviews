"use client";

import { ORDER_BY_ENUM, ORDER_ENUM } from "@/common/Constants";
import fetcher from "@/common/utils/functions";
import ReviewCardsList from "@/components/ReviewCardsList";
import SortSelect from "@/components/SortSelect";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import AddReviewButton from "./AddReviewButton";

interface ReviewsSection {
  dorm: any;
}

export default function ReviewsSection({ dorm }: ReviewsSection) {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [orderBy, setOrderBy] = useState(ORDER_BY_ENUM.createdAt);
  const [order, setOrder] = useState(ORDER_ENUM.desc);
  const limit = 3;

  const { data: session } = useSession();

  const { data, error, isLoading } = useSWR<any>(
    `${process.env.CLIENT_URL}/api/reviews?dorm=${dorm}&page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`,
    fetcher
  );

  if (
    data &&
    data.countReviews !== pageCount &&
    data.countReviews !== undefined
  )
    setPageCount(data.countReviews);

  const handlePage = (page: number) => setPage(page);
  const handleOrderBy = (orderBy: ORDER_BY_ENUM) => setOrderBy(orderBy);
  const handleOrder = (order: ORDER_ENUM) => setOrder(order);

  return (
    <>
      <div className="max-w-screen-2xl 2xl:mx-auto">
        <div className="flex w-full justify-between gap-2 p-4">
          <div className="flex items-center gap-6">
            <h1 className="text-4xl font-medium">Recenzii</h1>
            {session && <AddReviewButton />}
          </div>
          <SortSelect
            handleOrderBy={handleOrderBy}
            handleOrder={handleOrder}
            handlePage={handlePage}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 pb-8">
        {!isLoading ? (
          <ReviewCardsList
            reviews={data.reviews}
            page={page}
            pageCount={pageCount}
            limit={limit}
            handlePage={handlePage}
          />
        ) : (
          <h1>Se încarcă...</h1>
        )}
      </div>
    </>
  );
}
