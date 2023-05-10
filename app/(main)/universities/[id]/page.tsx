import CustomCarousel from "@/components/CustomCarousel";
import DormCardsList from "@/components/DormCardsList";
import { BiMapPin } from "react-icons/bi";
import { FaUniversity } from "react-icons/fa";

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
        <div className="max-w-screen-2xl 2xl:mx-auto flex flex-col xl:flex-row justify-between gap-8 py-8 px-4 md:px-8 lg:px-12">
          <div className="flex flex-col gap-6 pb-4 xl:pb-0">
            <div className="flex gap-4">
              <FaUniversity className="w-9 h-9" />
              <h1 className="text-4xl font-medium">{university.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <BiMapPin />
              <h1 className="text-xl">{university.location.name}</h1>
            </div>
            <p className="xl:max-w-lg">{university.description}</p>
          </div>
          <div className="max-w-4xl xl:w-[55%]">
            <CustomCarousel>
              <img src="/university2.jpg" />
              <img src="/university2.jpg" />
              <img src="/university2.jpg" />
            </CustomCarousel>
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-medium max-w-screen-2xl 2xl:mx-auto py-8 px-4 md:px-8 lg:px-12">
        Cămine
      </h1>
      <DormCardsList dorms={dorms} />
    </>
  );
}
