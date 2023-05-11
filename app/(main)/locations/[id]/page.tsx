import { UNIVERSITY_CARD_TYPE_ENUM } from "@/common/Constants";
import UniversityCard from "@/components/UniversityCard";
import UniversityCardsList from "@/components/UniversityCardsList";
import { MdOutlineLocationCity } from "react-icons/md";

export async function generateMetadata({ params, searchParams }) {
  const location = await getLocationById(params.id);
  return { title: location.name + " - Căminul Tău" };
}

async function getLocationById(id: string) {
  const res = await fetch("/api/locations/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getUniversitiesByLocation(location: string) {
  const res = await fetch("/api/universities?location=" + location);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }) {
  const location = await getLocationById(params.id);
  const universities = await getUniversitiesByLocation(location.name);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center bg-background gap-4 p-6 md:p-10 lg:p-14">
        <div className="flex items-end gap-4">
          <MdOutlineLocationCity className="w-9 h-9" />
          <h1 className=" text-4xl font-medium">{location.name}</h1>
        </div>
        <p className=" max-w-lg">{location.description}</p>
      </div>
      <div className="max-w-screen-2xl 2xl:mx-auto flex justify-center 2xl:justify-start p-4 pb-6">
        <h1 className="text-4xl font-medium">Universități</h1>
      </div>
      <UniversityCardsList universities={universities} />
    </div>
  );
}
