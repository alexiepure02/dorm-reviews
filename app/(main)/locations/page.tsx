import { BiMapAlt, BiSearchAlt } from "react-icons/bi";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

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
    <div className="flex flex-col xl:flex-row items-start justify-center bg-background p-6 md:p-10 lg:p-14">
      <div className="flex flex-col gap-6 pb-4 xl:pb-0">
        <div className="flex gap-4">
          <BiMapAlt className="w-9 h-9" />
          <h1 className=" text-4xl font-medium">Hartă</h1>
        </div>
        <p className=" max-w-lg">
          Aici aveți o hartă interactivă a marilor orașe din România. Fiecare
          oraș are un marcaj distinctiv Selectează un marcaj pentru a vedea
          universitățile din acea locație.
        </p>
      </div>
      <CustomMap locations={locations} />
    </div>
  );
}
