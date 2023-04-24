"use client";

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
 
async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

interface ReviewsSection {}

export default function ReviewsSection({}: ReviewsSection) {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const limit = 3;

  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const { data, error, isLoading } = useSWR<any>(
    `http://localhost:3000/api/reviews?user=${user}&page=${page}&limit=${limit}`,
    fetcher
  );

  if (
    data &&
    data.countReviews !== pageCount &&
    data.countReviews !== undefined
  )
    setPageCount(data.countReviews);

  data && data.reviews !== undefined && (data.reviews = undefined);

  const handlePage = (page: number) => setPage(page);

  return (
    <>
      <div className="container mx-auto flex justify-center 2xl:justify-start p-4">
        <h1 className="text-4xl font-medium">Recenziile tale</h1>
      </div>
      <div className="flex flex-col items-center">
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
            <h1>
              Încă nu ai evaluat niciun cămin. Lasă o recenzie căminului în care
              ai locuit și aceasta va apărea aici.
            </h1>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
