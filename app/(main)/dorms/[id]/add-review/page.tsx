import ReviewForm from "./ReviewForm";

async function getDormById(id: string) {
  const res = await fetch("/api/dorms/" + id);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }) {
  const { dorm } = await getDormById(params.id);

  return (
    <div className="md:flex md:justify-center md:py-20 mx-3">
      <ReviewForm dorm={dorm} />
    </div>
  );
}
