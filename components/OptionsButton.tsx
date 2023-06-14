"use client";

import useOutsideClick from "@/common/utils/hooks";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { SlOptions } from "react-icons/sl";
import { mutate } from "swr";

interface OptionsButtonProps {
  userId: string;
  reviewId: string;
}

export default function OptionsButton({
  userId,
  reviewId,
}: OptionsButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasBeenDeleted, setHasBeenDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const dropdownRef = useRef<any>();
  const modalRef = useRef<any>();

  const handleCloseDropdown = () => setShowDropdown(false);
  const handleDropdown = (e: any) => {
    setShowDropdown(!showDropdown);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useOutsideClick(dropdownRef, () => {
    handleCloseDropdown();
  });
  useOutsideClick(modalRef, () => {
    handleCloseDropdown();
    handleCloseModal();
  });

  const removeReview = async () => {
    setLoading(true);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`);

    setHasBeenDeleted(true);
    setLoading(false);
    handleCloseModal();
    handleCloseDropdown();
  };

  return !hasBeenDeleted && session?.user?.id === userId ? (
    <div ref={dropdownRef} className="relative">
      <div
        className={`p-2 rounded-full hover:bg-hover cursor-pointer hover:text-gray-2 ${
          showDropdown ? "text-gray-2" : "text-gray-1"
        }`}
        onClick={handleDropdown}
      >
        <SlOptions className="w-5 h-5" />
      </div>

      {showDropdown && (
        <ul className="z-2 absolute mt-2 w-48 right-0 rounded bg-white ring-1 ring-gray-1 shadow-md">
          <li
            className="cursor-pointer select-none p-2 hover:bg-hover"
            onClick={handleOpenModal}
          >
            Șterge recenzia
          </li>
        </ul>
      )}
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              ref={modalRef}
              className="relative w-auto my-6 mx-auto max-w-3xl p-4"
            >
              <div className="p-8 rounded-lg shadow-lg relative flex flex-col gap-2 w-full bg-white outline-none focus:outline-none">
                <h1 className="text-primary-100 text-2xl font-bold">
                  Atenție!
                </h1>
                <h1 className="text-lg">
                  Odată ștearsă, recenzia se va pierde pe veci.
                </h1>
                <h1 className="text-lg">
                  Ești sigur că vrei să ștergi această recenzie?
                </h1>
                {!loading ? (
                  <div className="flex items-center justify-between pt-4 rounded-b">
                    <button
                      disabled={loading}
                      className="text-white bg-primary-100 font-bold uppercase text-sm px-6 py-3 rounded outline-none shadow hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        handleCloseModal();
                        handleCloseDropdown();
                      }}
                    >
                      Nu, m-am răzgândit
                    </button>
                    <button
                      disabled={loading}
                      className="text-red-500 bg-transparent font-bold uppercase text-sm px-6 py-3 rounded outline-none shadow hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={removeReview}
                    >
                      Da, șterge
                    </button>
                  </div>
                ) : (
                  <h1 className="text-xl text-red-700 pt-4">Se șterge...</h1>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  ) : null;
}
