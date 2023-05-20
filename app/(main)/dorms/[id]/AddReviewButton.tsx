"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default () => {
  const pathname = usePathname();

  return (
    <Button className="px-8 text-lg font-semibold">
      <Link href={pathname + "/add-review"}>Adaugă o Recenzie</Link>
    </Button>
  );
};
