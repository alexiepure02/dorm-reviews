"use client";

import { getImageIndexFromUrl } from "@/common/utils/functions";
import useOutsideClick from "@/common/utils/hooks";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

interface ImagesAdminProps {
  images: string[];
  removable?: boolean;
  removeImage?: (imageIndex: string) => void;
}

export default function ImagesAdminUrl({
  images,
  removable = false,
  removeImage,
}: ImagesAdminProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");

  const modalRef = useRef<any>();

  useOutsideClick(modalRef, () => {
    handleCloseModal();
  });

  useEffect(() => {
    if (loading) setLoading(false);
  }, [images]);

  const handleRemove = () => {
    setLoading(true);
    if (removeImage && selectedUrl)
      removeImage(getImageIndexFromUrl(selectedUrl));
    handleCloseModal();
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return !loading ? (
    <>
      <div className="grid grid-cols-2 gap-2">
        {images.length !== 0 &&
          (removable && removeImage
            ? images.map((url: string, index: number) => (
                <div key={index} className="relative">
                  <AiFillDelete
                    className="absolute w-8 h-8 top-1 right-1 p-2 text-gray-4 bg-gray-1 bg-opacity-60 hover:bg-hover hover:bg-opacity-80 rounded-full cursor-pointer"
                    onClick={() => {
                      setSelectedUrl(url);
                      handleOpenModal();
                    }}
                  />
                  <img src={url} className="w-32" />
                </div>
              ))
            : images.map((image: string, index: number) => (
                <img key={index} src={image} className="w-32" />
              )))}
      </div>
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
                  Odată ștearsă, imaginea se va pierde pe veci.
                </h1>
                <h1 className="text-lg">
                  Ești sigur că vrei să ștergi imaginea?
                </h1>
                <div className="flex items-center justify-between pt-4 rounded-b">
                  <button
                    className="text-white bg-primary-100 font-bold uppercase text-sm px-6 py-3 rounded outline-none shadow hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Nu, m-am răzgândit
                  </button>
                  <button
                    className="text-red-500 bg-transparent font-bold uppercase text-sm px-6 py-3 rounded outline-none shadow hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleRemove}
                  >
                    Da, șterge
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  ) : (
    <h1 className="">Așteaptă...</h1>
  );
}
