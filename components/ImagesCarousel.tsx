"use client";

import useOutsideClick from "@/common/utils/hooks";
import { useRef, useState } from "react";
import CustomCarousel from "./CustomCarousel";

interface ImagesCarouselProps {
  images: string[];
}

export default function ImagesCarousel({ images }: ImagesCarouselProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const modalRef = useRef<any>();

  const handleOpenModal = (index: number) => {
    setShowModal(true);
    setSelectedImageIndex(index);
  };
  const handleCloseModal = () => setShowModal(false);

  useOutsideClick(modalRef, () => {
    handleCloseModal();
  });

  return (
    <>
      <CustomCarousel onClickItem={handleOpenModal}>
        {images.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            alt={"Image " + index}
            className="object-cover h-[400px]"
          />
        ))}
      </CustomCarousel>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                    className="object-contain max-h-[500px]"
                  />
                ))}
              </CustomCarousel>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      ;
    </>
  );
}
