import CustomCarousel from "@/components/CustomCarousel";
import DormMeans from "@/components/DormMeans";
import { BiMapPin } from "react-icons/bi";
import { MdOutlineBed } from "react-icons/md";

interface DormDetailsProps {
  dorm: any;
  means: any;
}

export default function DormDetails({ dorm, means }: DormDetailsProps) {
  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto flex flex-col xl:flex-row justify-between gap-8 p-6 md:p-10 lg:p-14">
          <div className="flex flex-col justify-center gap-6 pb-4 xl:pb-0">
            <div className="flex gap-4">
              <MdOutlineBed className="w-9 h-9" />
              <h1 className="text-4xl font-medium">{dorm.name}</h1>
            </div>
            <div>
              <h1 className="text-xl">{dorm.university.name}</h1>
              <div className="flex items-center gap-2">
                <BiMapPin />
                <p className=" max-w-lg">
                  {dorm.address},{" "}
                  {dorm.location !== null ? dorm.location.name : "city name"}
                </p>
              </div>
            </div>
            <DormMeans means={means} />
          </div>
          <div className="max-w-4xl w-full xl:w-[55%]">
            <CustomCarousel>
              <img src="/university2.jpg" />
              <img src="/university2.jpg" />
              <img src="/university2.jpg" />
            </CustomCarousel>
          </div>
        </div>
      </div>
    </>
  );
}
