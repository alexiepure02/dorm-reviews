"use client";

import Button from "@/components/Button";
import { usePathname, useRouter } from "next/navigation";

export default () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleAddReviewClick = () => router.push(pathname + "/add-review");

  return (
    <Button
      className="px-8 text-lg font-semibold"
      onClick={handleAddReviewClick}
    >
      Adaugă o Recenzie
    </Button>
  );
};
