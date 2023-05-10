import { UNIVERSITY_CARD_TYPE_ENUM } from "@/common/Constants";
import UniversityCard from "./UniversityCard";

async function getTopUniversities(limit: number) {
  const res = await fetch(
    `http://localhost:3000/api/universities/top?limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function TopUniversities() {
  const TOP_UNIVERSITIES_NUMBER = 4;

  const universities = await getTopUniversities(TOP_UNIVERSITIES_NUMBER);

  return (
    <div className="grid py-8 gap-8 items-stretch md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {universities.map((university: any) => (
        <UniversityCard
          type={UNIVERSITY_CARD_TYPE_ENUM.vertical}
          university={university}
        />
      ))}
    </div>
  );
}
