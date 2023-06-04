"use client";

import { useRef, useState } from "react";
import CustomCarousel from "./CustomCarousel";
import useOutsideClick from "@/common/utils/hooks";

interface ReviewImagesProps {
  images: string[];
}

export default function ReviewImages({ images }: ReviewImagesProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const modalRef = useRef<any>();

  const handleOpenModal = (index: number) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  useOutsideClick(modalRef, () => {
    handleCloseModal();
  });

  return (
    <>
      <div className="flex gap-2">
        {images.length !== 0 &&
          images.map((image: string, index: number) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => handleOpenModal(index)}
            >
              <img src={image} className="object-cover max-h-20" />
            </div>
          ))}
      </div>
      {showModal && (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              ref={modalRef}
              className="relative w-auto my-6 mx-auto max-w-3xl p-4"
            >
              <CustomCarousel dynamicHeight selectedItem={selectedImageIndex}>
                {images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={"Image " + index}
                    className="object-contain max-h-[400px] md:max-h-[600px]"
                  />
                ))}
              </CustomCarousel>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
