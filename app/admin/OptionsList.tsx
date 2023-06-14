"use client";

import { Role } from "@/common/Constants";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function OptionsList() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (session !== undefined && session?.user?.role !== Role.admin)
    router.push("/");

  return (
    <div className="min-w-max flex flex-col-reverse md:flex-col items-center gap-8">
      <div className="w-full flex flex-col divide-y-2 divide-primary-600 text-lg bg-background p-4 rounded-md">
        <Link
          prefetch={false}
          href={"/admin/add-location"}
          className={`p-2 hover:bg-primary-800 ${
            pathname === "/admin/add-location" && "bg-primary-800"
          }`}
        >
          Adaugă locație
        </Link>
        <Link
          prefetch={false}
          href={"/admin/update-location"}
          className={`p-2 hover:bg-primary-800 ${
            pathname === "/admin/update-location" && "bg-primary-800"
          }`}
        >
          Actualizează locație
        </Link>
        <Link
          prefetch={false}
          href={"/admin/remove-location"}
          className={`p-2 hover:bg-primary-800 ${
            pathname === "/admin/remove-location" && "bg-primary-800"
          }`}
        >
          Șterge locație
        </Link>
        <Link
          prefetch={false}
          href={"/admin/add-university"}
          className={`p-2 hover:bg-primary-800 ${
            pathname === "/admin/add-university" && "bg-primary-800"
          }`}
        >
          Adaugă universitate
        </Link>
        <Link
          prefetch={false}
          href={"/admin/update-university"}
          className={`p-2 hover:bg-primary-800 ${
            pathname === "/admin/update-university" && "bg-primary-800"
          }`}
        >
          Actualizează universitate
        </Link>
        <Link
          prefetch={false}
          href={"/admin/remove-university"}
          className={`p-2 hover:bg-primary-800 ${
            pathname === "/admin/remove-university" && "bg-primary-800"
          }`}
        >
          Șterge universitate
        </Link>
        <Link
          prefetch={false}
          href={"/admin/add-dorm"}
          className={`p-2 hover:bg-primary-800 ${
            pathname === "/admin/add-dorm" && "bg-primary-800"
          }`}
        >
          Adaugă cămin
        </Link>
        <Link
          prefetch={false}
          href={"/admin/update-dorm"}
          className={`p-2 hover:bg-primary-800 ${
            pathname === "/admin/update-dorm" && "bg-primary-800"
          }`}
        >
          Actualizează cămin
        </Link>
        <Link
          prefetch={false}
          href={"/admin/remove-dorm"}
          className={`p-2 hover:bg-primary-800 ${
            pathname === "/admin/remove-dorm" && "bg-primary-800"
          }`}
        >
          Șterge cămin
        </Link>
        <Link
          prefetch={false}
          href={"/admin/remove-review"}
          className={`p-2 hover:bg-primary-800 ${
            pathname === "/admin/remove-review" && "bg-primary-800"
          }`}
        >
          Șterge recenzie
        </Link>
        <Link
          prefetch={false}
          href={"/admin/users"}
          className={`p-2 hover:bg-primary-800 ${
            pathname === "/admin/users" && "bg-primary-800"
          }`}
        >
          Utilizatori
        </Link>
      </div>
      <Button className="px-6">
        <Link prefetch={false} href={"/"}>
          Înapoi Acasă
        </Link>
      </Button>
    </div>
  );
}
