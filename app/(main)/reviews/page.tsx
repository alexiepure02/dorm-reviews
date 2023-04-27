import Input from "@/components/Input";
import { BiSearchAlt } from "react-icons/bi";
import ReviewsSection from "./ReviewsSection";

export default function Page() {
  return (
    <>
      <div className="h-[500px] flex flex-col items-center justify-center text-center gap-8 bg-background px-9">
        <h1 className="text-4xl">Scrie o recenzie..</h1>
        <p className="text-lg	max-w-xl">
          Împărtășește-ți povestea și ajută pe cineva să-și aleagă viitorul loc
          unde să locuiască în timpul studiilor
        </p>
        <Input
          Icon={BiSearchAlt}
          id="search"
          type="text"
          placeholder="Caută un cămin"
          classNameDiv="w-full max-w-3xl"
        />
      </div>
      <ReviewsSection />
    </>
  );
}
