"use client";

import { ORDER_BY_ENUM, ORDER_ENUM } from "@/common/Constants";
import fetcher from "@/common/utils/functions";
import ReviewCardsList from "@/components/ReviewCardsList";
import SortSelect from "@/components/SortSelect";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export default function ReviewsSection() {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [orderBy, setOrderBy] = useState(ORDER_BY_ENUM.createdAt);
  const [order, setOrder] = useState(ORDER_ENUM.desc);
  const limit = 3;

  const { data: session } = useSession();
  const user = session?.user?.name;

  const { data, error, isLoading } = useSWR<any>(
    `http://localhost:3000/api/reviews?user=${user}&page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`,
    fetcher
  );

  if (
    data &&
    data.countReviews !== undefined &&
    data.countReviews !== pageCount
  )
    setPageCount(data.countReviews);

  const handlePage = (page: number) => setPage(page);
  const handleOrderBy = (orderBy: ORDER_BY_ENUM) => setOrderBy(orderBy);
  const handleOrder = (order: ORDER_ENUM) => setOrder(order);

  return (
    <>
      <div className="max-w-screen-2xl 2xl:mx-auto">
        <div className="flex w-full justify-between gap-2 p-4">
          <h1 className="text-4xl font-medium">Recenziile tale</h1>
          <SortSelect
            handleOrderBy={handleOrderBy}
            handleOrder={handleOrder}
            handlePage={handlePage}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 pb-8">
        {user ? (
          !isLoading ? (
            <ReviewCardsList
              reviews={data.reviews}
              showDormNames
              page={page}
              pageCount={pageCount}
              limit={limit}
              handlePage={handlePage}
            />
          ) : (
            <h1>Se încarcă...</h1>
          )
        ) : (
          <h1>Conectează-te cu un cont pentru a putea lăsa recenzii.</h1>
        )}
      </div>
    </>
  );
}
