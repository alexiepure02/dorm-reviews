import ReviewsSection from "@/components/ReviewsSection";
import SearchInput from "@/components/SearchInput";

export const metadata = {
  title: "Recenziile mele - Căminul Tău",
};

export default function Page() {
  return (
    <>
      <div className="bg-background">
        <div className="max-w-screen-2xl 2xl:mx-auto flex flex-col items-center justify-center text-center gap-8 p-6 md:p-10 lg:p-14">
          <h1 className="text-4xl font-semibold">Scrie o recenzie...</h1>
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-lg	max-w-xl">
              Experiența ta contează! Vrem să auzim povestea ta!
            </p>
            <p className="text-lg	max-w-3xl">
              Hai să construim împreună o comunitate de studenți care își
              împărtășesc experiențele și își ajută colegii să ia decizii
              înțelepte.
            </p>
            <p className="text-lg	max-w-xl">
              Lasă-ți amprenta și scrie o recenzie acum!
            </p>
          </div>
          <SearchInput />
        </div>
      </div>
      <ReviewsSection />
    </>
  );
}
