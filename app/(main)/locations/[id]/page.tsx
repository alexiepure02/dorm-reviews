import { UNIVERSITY_CARD_TYPE_ENUM } from "@/common/Constants";
import UniversityCard from "@/components/UniversityCard";
import { MdOutlineLocationCity } from "react-icons/md";

async function getLocationById(id: string) {
  const res = await fetch("http://localhost:3000/api/locations/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getUniversitiesByLocation(location: string) {
  const res = await fetch(
    "http://localhost:3000/api/universities?location=" + location
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }) {
  const location = await getLocationById(params.id);
  const universities = await getUniversitiesByLocation(location.name);

  return (
    <div className="flex flex-col xl:flex-row items-start justify-center bg-background p-6 md:p-10 lg:p-14">
      <div className="flex flex-col gap-6 pb-4 xl:pb-0">
        <div className="flex gap-4">
          <MdOutlineLocationCity className="w-9 h-9" />
          <h1 className=" text-4xl font-medium">{location.name}</h1>
        </div>
        <p className=" max-w-lg">{location.description}</p>
      </div>
      <div className="flex gap-9">
        {universities.map((university: any, index: number) =>
          index < 3 ? (
            <UniversityCard
              key={index}
              type={UNIVERSITY_CARD_TYPE_ENUM.vertical}
              university={university}
            />
          ) : (
            <UniversityCard
              key={index}
              type={UNIVERSITY_CARD_TYPE_ENUM.horizontal}
              university={university}
            />
          )
        )}
      </div>
    </div>
  );
}
