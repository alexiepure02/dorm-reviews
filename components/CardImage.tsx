"use client";

import Image from "next/image";
import fetcher from "@/common/utils/functions";
import useSWR from "swr";

interface CardImageProps {
  name: string;
  fallback: string;
  alt: string;
  className?: string;
}

export const CardImage = ({
  name,
  fallback,
  alt,
  className = "",
}: CardImageProps) => {
  const {
    data: images,
    error,
    isLoading,
  } = useSWR<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/image/${name}`,
    fetcher
  );

  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <Image
        alt={alt}
        src={images ? (images.length !== 0 ? images[0] : fallback) : fallback}
        fill
        style={{ objectFit: "cover" }}
        priority={true}
        sizes="(max-width: 640px) 100%"
      />
    </div>
  );
};
