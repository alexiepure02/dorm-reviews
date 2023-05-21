import { BiMapAlt } from "react-icons/bi";
import dynamic from "next/dynamic";
import Link from "next/link";

export const metadata = {
  title: "Hartă - Căminul Tău",
};

const CustomMap = dynamic(() => import("@/components/map/CustomMap"), {
  ssr: false,
});

async function getLocations() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function Page() {
  const locations = await getLocations();

  return (
    <div className="flex flex-col xl:flex-row xl:items-start xl:justify-center bg-background gap-4 p-6 md:p-10 lg:p-14">
      <div className="flex flex-col gap-6 pb-4 xl:pb-0">
        <div className="flex items-end gap-4">
          <BiMapAlt className="w-9 h-9" />
          <h1 className=" text-4xl font-medium">Hartă</h1>
        </div>
        <p className=" max-w-lg">
          Aici aveți o hartă interactivă a marilor orașe din România. Fiecare
          oraș are un marcaj distinctiv Selectează un marcaj pentru a vedea
          universitățile din acea locație.
        </p>
      </div>
      <div className="flex justify-center">
        {locations && <CustomMap locations={locations} />}
      </div>
    </div>
  );
}
