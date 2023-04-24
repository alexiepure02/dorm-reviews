import { UNIVERSITY_CARD_TYPE_ENUM } from "@/common/Constants";
import Button from "@/components/Button";
import CustomCarousel from "@/components/CustomCarousel";
import CustomRating from "@/components/CustomRating";
import DormCard from "@/components/DormCard";
import ReviewCardsList from "@/components/ReviewCardsList";
import { BiMapPin } from "react-icons/bi";
import { MdOutlineBed } from "react-icons/md";
import AddReviewButton from "./AddReviewButton";
import DormDetails from "./DormDetails";
import ReviewsSection from "./ReviewsSection";

async function getDormById(id: string) {
  const res = await fetch("http://localhost:3000/api/dorms/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }) {
  // will have to update to Next 13.3 and use useParams so I no longer get error
  const { dorm, means } = await getDormById(params.id);
  
  return (
    <>
      <DormDetails dorm={dorm} means={means} />
      <ReviewsSection dorm={dorm.name} />
    </>
  );
}
