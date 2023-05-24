"use client";

import { ChangeEvent, useRef } from "react";
import ImageAdminFile from "./ImageAdminFile";

interface ImagesInputProps {
  newImage: File | null;
  handleNewImage: (images: File | null) => void;
  handleError: (error: string) => void;
}

export default function ImagesInput({
  newImage,
  handleNewImage,
  handleError,
}: ImagesInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files[0] === undefined) return;

    const file = e.target.files[0];

    if (
      !(
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      )
    ) {
      handleError("Fișierul trebuie să aibă extensia png, jpg sau jpeg");
    }

    handleNewImage(file);
  };

  const removeImage = () => {
    handleNewImage(null);
  };

  return (
    <div className="flex items-start gap-4">
      <div className="relative">
        <button
          type="button"
          className="relative z-2 bg-white cursor-pointer py-2 px-4 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-3 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100"
          onClick={handleFileSelect}
        >
          Adaugă
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {newImage && (
        <ImageAdminFile image={newImage} removeImage={removeImage} removable />
      )}
    </div>
  );
}
