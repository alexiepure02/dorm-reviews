import { UNIVERSITY_CARD_TYPE_ENUM } from "@/common/Constants";
import CustomCarousel from "@/components/CustomCarousel";
import DormCard from "@/components/DormCard";
import UniversityCard from "@/components/UniversityCard";
import { BiBuildings, BiMapPin } from "react-icons/bi";
import { MdOutlineLocationCity } from "react-icons/md";

async function getUniversityById(id: string) {
  const res = await fetch("http://localhost:3000/api/universities/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getDormsByUniversity(university: string) {
  const res = await fetch(
    "http://localhost:3000/api/dorms?university=" + university
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }) {
  const university = await getUniversityById(params.id);
  const dorms = await getDormsByUniversity(university.name);

  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto flex flex-col xl:flex-row justify-between gap-8 p-6 md:p-10 lg:p-14">
          <div className="flex flex-col gap-6 pb-4 xl:pb-0">
            <div className="flex gap-4">
              <BiBuildings className="w-9 h-9" />
              <h1 className="text-4xl font-medium">{university.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <BiMapPin />
              <h1 className="text-xl">{university.location.name}</h1>
            </div>
            <p className="xl:max-w-lg">{university.description}</p>
          </div>
          <div className="max-w-4xl w-full xl:w-[55%]">
            <CustomCarousel />
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col w-full justify-between">
        <h1 className="text-4xl font-medium">Recenzii</h1>
        <div className="flex justify-between gap-9 py-12">
          {dorms.map((dorm: any, index: number) => (
            <DormCard key={index} dorm={dorm} />
          ))}
        </div>
      </div>
    </>
  );
}
