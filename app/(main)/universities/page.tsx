import { BiBuildings } from "react-icons/bi";
import UniversityCardsList from "@/components/UniversityCardsList";

export const metadata = {
  title: "Universități - Căminul Tău",
};

async function getUniversities() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/universities`
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function Page() {
  const universities = await getUniversities();

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center gap-4 text-center bg-background p-6 md:p-10 lg:p-14">
        <div className="flex items-end gap-4">
          <BiBuildings className="w-9 h-9" />
          <h1 className=" text-4xl font-medium">Universități</h1>
        </div>
        <p className="text-lg max-w-2xl">
          Aici vei găsi o listă completă ce conține numele și locația fiecărei
          universități din țară care oferă posibilități de acomodare
          studenților.
        </p>
        <p className="text-lg max-w-2xl">
          Caută universități în funcție de nume, acronim sau locație, pentru a
          găsi rapid informațiile de care ai nevoie.
        </p>
      </div>
      <UniversityCardsList universities={universities} />
    </div>
  );
}
