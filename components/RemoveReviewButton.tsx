"use client";

import useOutsideClick from "@/common/utils/hooks";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { MdDeleteForever, MdRemoveCircle } from "react-icons/md";
import { mutate } from "swr";

interface RemoveReviewButtonProps {
  userId: string;
  reviewId: string;
}

export default function RemoveReviewButton({
  userId,
  reviewId,
}: RemoveReviewButtonProps) {
  const [expanded, setExpanded] = useState(false);
  const [timer, setTimer] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [revalidate, setRevalidate] = useState(false);

  const { data: session } = useSession();

  const close = () => {
    console.log("close");
    setExpanded(false);
  };
  const closeRef = useOutsideClick(close);

  const timerRef = useRef(null);

  const getTimeRemaining = (e: string) => {
    const total = Date.parse(e) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    return {
      total,
      seconds,
    };
  };

  const startTimer = (e: any) => {
    let { total, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(seconds.toString());
    }
  };

  const clearTimer = (e: any) => {
    setTimer("5");

    if (timerRef.current) clearInterval(timerRef.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    //@ts-ignore
    timerRef.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 5);
    return deadline;
  };

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  const handleExpand = (e: any) => {
    onClickReset();
    setExpanded(!expanded);
  };

  const removeReview = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${reviewId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setSuccess(`Recenzia ${reviewId} ștearsă cu succes`);
        setError("");
      } else {
        setSuccess("");
        setError("Eroare la ștergerea recenziei");
      }
    });
    
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`);
  };

  return session?.user?.id === userId ? (
    <>
      {success && <h1 className="text-green-500">{success}</h1>}
      {error && <h1 className="text-red-500">{error}</h1>}

      <div ref={closeRef}>
        <div className="absolute -top-3 -right-3">
          <MdRemoveCircle
            className={`${
              expanded
                ? "text-red-500 hover:text-red-400"
                : "text-red-400 hover:text-red-500"
            } hover:text-red-500 w-10 h-10 cursor-pointer`}
            onClick={handleExpand}
          />
        </div>
        {expanded && (
          <div className="absolute -top-2 right-10 text-white flex flex-col items-start gap-2">
            <h1 className="bg-red-500 p-1 rounded-md cursor-default">
              Odată ștearsă, recenzia se va pierde pe veci.
            </h1>
            <h1 className="bg-red-500 p-1 rounded-md cursor-default">
              Ești sigur că vrei să îți ștergi recenzia?
            </h1>
            {timer !== "0" ? (
              <div className="flex items-center gap-1 bg-red-300 p-1 rounded-md cursor-not-allowed">
                <h1 className="w-6 text-center">{timer}</h1>
                <h1>Da, sunt sigur.</h1>
              </div>
            ) : (
              <div
                className="flex items-center gap-1 bg-red-500 hover:bg-red-700 p-1 rounded-md cursor-pointer"
                onClick={removeReview}
              >
                <MdDeleteForever className="w-6 h-6" />
                <h1>Da, sunt sigur.</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  ) : null;
}
