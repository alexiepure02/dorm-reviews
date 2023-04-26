import { BiMapAlt, BiSearchAlt } from "react-icons/bi";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import Link from "next/link";

const CustomMap = dynamic(() => import("@/components/map/CustomMap"), {
  ssr: false,
});

async function getLocations() {
  const res = await fetch("http://localhost:3000/api/locations");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page() {
  const locations = await getLocations();

  return (
    <>
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-center bg-background gap-4 p-4 md:p-8 lg:p-12">
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
          <CustomMap locations={locations} />
        </div>
      </div>
      <div className="container mx-auto flex flex-col items-start py-8 px-4">
        {locations.map((location) => (
          <Link
            href={"/locations/" + location._id}
            className="hover:underline text-lg"
          >
            {location.name}
          </Link>
        ))}
      </div>
    </>
  );
}
