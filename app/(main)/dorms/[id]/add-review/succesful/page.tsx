import SuccesfulPage from "./SuccesfulPage";

async function getDormById(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dorms/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }) {
  const { dorm } = await getDormById(params.id);

  return <SuccesfulPage dorm={dorm} />;
}
