"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SuccesfulPageProps {
  dorm: any;
}

export default ({ dorm }: SuccesfulPageProps) => {
  const pathname = usePathname();

  const dormPathname = pathname?.split("/").slice(1, 3).join("/")!;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <div className="w-full bg-background text-center py-20">
        <h1 className="text-2xl mx-6">
          🎉 Felicitări! Ai adăugat cu succes o recenzie căminului{" "}
          <strong>{dorm.name}</strong> al universității{" "}
          <strong>{dorm.university.name}</strong>.
        </h1>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button className="px-4">
          <Link href={"/" + dormPathname}>Înapoi la cămin</Link>
        </Button>
      </div>
    </div>
  );
};
