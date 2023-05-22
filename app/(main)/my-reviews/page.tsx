import ReviewsSection from "@/components/ReviewsSection";
import SearchInput from "@/components/SearchInput";

export const metadata = {
  title: "Recenziile mele - Căminul Tău",
};

export default function Page() {
  return (
    <>
      <div className="bg-background">
        <div className="h-[500px] max-w-screen-2xl 2xl:mx-auto flex flex-col items-center justify-center text-center gap-8 px-9">
          <h1 className="text-4xl">Scrie o recenzie..</h1>
          <p className="text-lg	max-w-xl">
            Împărtășește-ți povestea și ajută pe cineva să-și aleagă viitorul
            loc unde să locuiască în timpul studiilor
          </p>
          <SearchInput />
        </div>
      </div>
      <ReviewsSection />
    </>
  );
}
