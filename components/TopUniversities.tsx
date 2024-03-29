import { UNIVERSITY_CARD_TYPE_ENUM } from "@/common/Constants";
import UniversityCard from "./UniversityCard";

async function getTopUniversities(limit: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/universities/top?limit=${limit}`
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function TopUniversities() {
  const universities = await getTopUniversities(4);

  return (
    <div className="grid py-8 gap-8 items-stretch justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {universities &&
        universities.map((university: any) => (
          <UniversityCard
            type={UNIVERSITY_CARD_TYPE_ENUM.vertical}
            university={university}
          />
        ))}
    </div>
  );
}
