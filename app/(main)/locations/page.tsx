import { BiMapAlt } from "react-icons/bi";
import dynamic from "next/dynamic";
import Link from "next/link";

export const metadata = {
  title: "Hartă - Căminul Tău",
};

const CustomMap = dynamic(() => import("@/components/map/CustomMap"), {
  ssr: false,
});

async function getLocations() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function Page() {
  const locations = await getLocations();

  return (
    <div className="flex flex-col 2xl:flex-row 2xl:items-start 2xl:justify-center bg-background gap-4 p-6 md:p-10 lg:p-14">
      <div className="flex flex-col items-center 2xl:items-start gap-6 pb-4 xl:pb-0">
        <div className="flex items-end gap-4">
          <BiMapAlt className="w-9 h-9" />
          <h1 className=" text-4xl font-medium">Hartă</h1>
        </div>
        <p className="text-lg max-w-2xl 2xl:max-w-lg text-center 2xl:text-start">
          Explorează harta interactivă a României și descoperă principalele
          orașe universitare ale țării. Fiecare oraș universitar este marcat pe
          hartă, oferindu-ți o imagine de ansamblu asupra locațiilor în care
          poți găsi cămine studențești.
        </p>
        <p className="hidden md:inline-block text-lg max-w-2xl 2xl:max-w-lg text-center 2xl:text-start">
          Indiferent dacă ești interesat de un anumit oraș sau vrei să explorezi
          opțiuni în diferite regiuni ale țării, harta noastră interactivă îți
          oferă o modalitate rapidă și intuitivă de a naviga prin diversele
          locații universitare.
        </p>
      </div>
      <div className="flex justify-center">
        {locations && <CustomMap locations={locations} />}
      </div>
    </div>
  );
}
