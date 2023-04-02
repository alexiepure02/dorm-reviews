import { UNIVERSITY_CARD_TYPE_ENUM } from "@/common/Constants";
import DormCard from "@/components/DormCard";
import UniversityCard from "@/components/UniversityCard";
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
      <div className="flex flex-col xl:flex-row items-start justify-center bg-background p-6 md:p-10 lg:p-14">
        <div className="flex flex-col gap-6 pb-4 xl:pb-0">
          <div className="flex gap-4">
            <MdOutlineLocationCity className="w-9 h-9" />
            <h1 className=" text-4xl font-medium">{university.name}</h1>
          </div>
          <p className=" max-w-lg">{university.description}</p>
        </div>
      </div>
      <div className="flex justify-center gap-9">
        {dorms.map((dorm: any, index: number) => (
          <DormCard key={index} dorm={dorm} />
        ))}
      </div>
    </>
  );
}
