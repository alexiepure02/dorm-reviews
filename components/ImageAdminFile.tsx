"use client";

import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

interface ImageAdminFileProps {
  image: File;
  removable?: boolean;
  removeImage?: () => void;
}

export default function ImageAdminFile({
  image,
  removable = false,
  removeImage,
}: ImageAdminFileProps) {
  const [loading, setLoading] = useState(false);

  const handleRemove = () => {
    setLoading(true);
    if (removeImage) removeImage();
  };

  return removable && removeImage ? (
    !loading ? (
      <div className="relative">
        <AiFillDelete
          className="absolute w-8 h-8 top-1 right-1 p-2 text-gray-4 bg-gray-1 bg-opacity-60 hover:bg-hover hover:bg-opacity-80 rounded-full"
          onClick={handleRemove}
        />
        <img src={URL.createObjectURL(image)} className="w-32" />
      </div>
    ) : (
      <div className="bg-gray-1 w-32 h-32"></div>
    )
  ) : (
    <img src={URL.createObjectURL(image)} className="w-32" />
  );
}
