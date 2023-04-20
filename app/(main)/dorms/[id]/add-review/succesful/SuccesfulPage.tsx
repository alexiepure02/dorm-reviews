"use client";

import Button from "@/components/Button";
import { usePathname, useRouter } from "next/navigation";

interface SuccesfulPageProps {
  dorm: any;
}

export default ({ dorm }: SuccesfulPageProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const dormPathname = pathname?.split("/").slice(1, 3).join("/")!;
  const handleGoToDorm = () => router.push(dormPathname);

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
        <Button onClick={handleGoToDorm} className="px-4">
          Înapoi la cămin
        </Button>
      </div>
    </div>
  );
};
