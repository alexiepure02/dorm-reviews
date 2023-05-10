import { BiBuildings } from "react-icons/bi";
import dynamic from "next/dynamic";
import Link from "next/link";

const CustomMap = dynamic(() => import("@/components/map/CustomMap"), {
  ssr: false,
});

async function getUniversities() {
  const res = await fetch("http://localhost:3000/api/universities");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page() {
  const universities = await getUniversities();

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="flex flex-col items-center bg-background gap-4 p-6 md:p-10 lg:p-14">
          <div className="flex items-end gap-4">
            <BiBuildings className="w-9 h-9" />
            <h1 className=" text-4xl font-medium">Universități</h1>
          </div>
          <p className=" max-w-lg">
            Aici poți găsi o listă completă a tuturor universităților din
            România.
          </p>
        </div>
        {/* <div className="container mx-auto flex justify-center 2xl:justify-start p-4">
          <h1 className="text-4xl font-medium">Universități</h1>
        </div>
        <UniversityCardsList universities={universities} /> */}
        <div className="flex flex-col items-center px-4">
          {universities.map((university: any, index: number) => {
            return (
              <Link
                href={"/universities/" + university._id}
                className="hover:underline text-lg"
              >
                {university.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
