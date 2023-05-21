"use client";

import AddReviewButton from "@/app/(main)/dorms/[id]/AddReviewButton";
import { ORDER_BY_ENUM, ORDER_ENUM } from "@/common/Constants";
import fetcher from "@/common/utils/functions";
import ReviewCardsList from "@/components/ReviewCardsList";
import SortSelect from "@/components/SortSelect";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

interface ReviewsSectionProps {
  admin?: boolean;
  revalidate?: boolean;
  showAddReviewButton?: boolean;
  dorm?: string;
  checkedReviewIds?: string[];
  checkId?: (reviewId: string) => void;
  uncheckId?: (reviewId: string) => void;
}

export default function ReviewsSection({
  admin = false,
  revalidate = false,
  showAddReviewButton = true,
  dorm,
  checkedReviewIds,
  checkId,
  uncheckId,
}: ReviewsSectionProps) {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [orderBy, setOrderBy] = useState(ORDER_BY_ENUM.createdAt);
  const [order, setOrder] = useState(ORDER_ENUM.desc);
  const limit = 3;

  const { data: session } = useSession();
  const user = session?.user?.name;

  let url = "";

  if (dorm) {
    url = `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?dorm=${dorm}&page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`;
  } else {
    if (user) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?user=${user}&page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`;
    }
  }

  const { data, error, isLoading } = useSWR<any>(url, fetcher);

  if (
    data &&
    data.countReviews !== undefined &&
    data.countReviews !== pageCount
  )
    setPageCount(data.countReviews);

  useEffect(() => {
    if (revalidate) {
      mutate(url);
    }
  }, [revalidate]);

  const handlePage = (page: number) => setPage(page);
  const handleOrderBy = (orderBy: ORDER_BY_ENUM) => setOrderBy(orderBy);
  const handleOrder = (order: ORDER_ENUM) => setOrder(order);

  return (
    <>
      <div className="w-full max-w-screen-2xl 2xl:mx-auto p-4">
        <div className="flex w-full justify-between gap-2">
          {dorm ? (
            <div className="flex items-center gap-6">
              <h1 className="text-4xl font-medium">Recenzii</h1>
              {showAddReviewButton && session && <AddReviewButton />}
            </div>
          ) : (
            <h1 className="text-4xl font-medium">Recenziile mele</h1>
          )}
          <SortSelect
            handleOrderBy={handleOrderBy}
            handleOrder={handleOrder}
            handlePage={handlePage}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 pb-8">
        {dorm ? (
          !isLoading ? (
            <ReviewCardsList
              admin={admin}
              reviews={data.reviews}
              page={page}
              pageCount={pageCount}
              limit={limit}
              handlePage={handlePage}
              checkedReviewIds={checkedReviewIds}
              checkId={checkId}
              uncheckId={uncheckId}
            />
          ) : (
            <h1>Se încarcă...</h1>
          )
        ) : session !== null ? (
          session !== undefined && !isLoading ? (
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
