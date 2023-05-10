import DormDetails from "./DormDetails";
import ReviewsSection from "./ReviewsSection";

export async function generateMetadata({ params, searchParams }) {
  const dorm = await getDormById(params.id);
  return { title: dorm.dorm.name + " - Căminul Tău" };
}

async function getDormById(id: string) {
  const res = await fetch("http://localhost:3000/api/dorms/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }) {
  const { dorm, means } = await getDormById(params.id);

  return (
    <>
      <DormDetails dorm={dorm} means={means} />
      <ReviewsSection dorm={dorm.name} />
    </>
  );
}
