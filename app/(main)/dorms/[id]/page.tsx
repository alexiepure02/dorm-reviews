import { UNIVERSITY_CARD_TYPE_ENUM } from "@/common/Constants";
import Button from "@/components/Button";
import CustomCarousel from "@/components/CustomCarousel";
import CustomRating from "@/components/CustomRating";
import DormCard from "@/components/DormCard";
import DormDetails from "@/components/DormDetails";
import ReviewCardsList from "@/components/ReviewCardsList";
import { BiMapPin } from "react-icons/bi";
import { MdOutlineBed } from "react-icons/md";
import AddReviewButton from "./AddReviewButton";

async function getDormById(id: string) {
  const res = await fetch("http://localhost:3000/api/dorms/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getReviewsByDorm(dorm: string) {
  const res = await fetch("http://localhost:3000/api/reviews?dorm=" + dorm);
  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }
  return res.json();
}

export default async function Page({ params }) {
  const { dorm, means } = await getDormById(params.id);
  const reviews = await getReviewsByDorm(dorm.name);

  return (
    <>
      <div>
        <div className="bg-background">
          <div className="container mx-auto flex flex-col xl:flex-row items-start justify-between gap-8 p-6 md:p-10 lg:p-14">
            <div className="flex flex-col justify-center gap-6 pb-4 xl:pb-0">
              <div className="flex gap-4">
                <MdOutlineBed className="w-9 h-9" />
                <h1 className="text-4xl font-medium">{dorm.name}</h1>
              </div>
              <div>
                <h1 className="text-xl">{dorm.university.name}</h1>
                <div className="flex items-center gap-2">
                  <BiMapPin />
                  <p className=" max-w-lg">
                    {dorm.address},{" "}
                    {dorm.location !== null ? dorm.location.name : "city name"}
                  </p>
                </div>
              </div>
              <DormDetails means={means} />
            </div>
            <div className="max-w-4xl w-full xl:w-[55%]">
              <CustomCarousel>
                <img src="/university2.jpg" />
                <img src="/university2.jpg" />
                <img src="/university2.jpg" />
              </CustomCarousel>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex w-full justify-between p-4">
          <h1 className="text-4xl font-medium">Recenzii</h1>
          <AddReviewButton />
        </div>
      </div>
      {"error" in reviews ? (
        <div className="container mx-auto py-4">
          <h1>
            Acest cămin nu are încă recenzii. Fi tu primul care lasă o recenzie.
          </h1>
        </div>
      ) : (
        <ReviewCardsList reviews={reviews} />
      )}
    </>
  );
}
