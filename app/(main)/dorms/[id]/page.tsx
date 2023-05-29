import ReviewsSection from "@/components/ReviewsSection";
import DormDetails from "./DormDetails";

export async function generateMetadata({ params, searchParams }) {
  const dorm = await getDormById(params.id);
  return dorm
    ? { title: dorm.dorm.name + " - Căminul Tău" }
    : { title: "Cămin - Căminul Tău" };
}

async function getDormById(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dorms/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getDormImages(name: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/image/${name}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }) {
  const { dorm, means } = await getDormById(params.id);
  const images = await getDormImages(params.id);

  return (
    <>
      <DormDetails dorm={dorm} means={means} images={images} />
      <ReviewsSection dorm={dorm.name} />
    </>
  );
}
