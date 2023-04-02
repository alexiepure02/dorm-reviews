import { UNIVERSITY_CARD_TYPE_ENUM } from "@/common/Constants";
import DormCard from "@/components/DormCard";
import ReviewCard from "@/components/ReviewCard";
import ReviewCardsList from "@/components/ReviewCardsList";
import UniversityCard from "@/components/UniversityCard";
import { MdOutlineLocationCity } from "react-icons/md";

async function getDormById(id: string) {
  const res = await fetch("http://localhost:3000/api/dorms/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getReviewsByDorm(dorm: string) {
  const res = await fetch("http://localhost:3000/api/reviews?dorm=" + dorm);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }) {
  const dorm = await getDormById(params.id);
  const reviews = await getReviewsByDorm(dorm.name);

  return (
    <>
      <div className="flex flex-col xl:flex-row items-start justify-center bg-background p-6 md:p-10 lg:p-14">
        <div className="flex flex-col gap-6 pb-4 xl:pb-0">
          <div className="flex gap-4">
            <MdOutlineLocationCity className="w-9 h-9" />
            <h1 className=" text-4xl font-medium">{dorm.name}</h1>
          </div>
          <p className=" max-w-lg">{dorm.description}</p>
        </div>
      </div>
      <ReviewCardsList reviews={reviews}/>
    </>
  );
}
