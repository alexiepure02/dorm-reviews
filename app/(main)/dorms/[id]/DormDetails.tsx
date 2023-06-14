import DormMeans from "@/components/DormMeans";
import ImagesCarousel from "@/components/ImagesCarousel";
import Link from "next/link";
import { BiMapPin } from "react-icons/bi";
import { MdOutlineBed } from "react-icons/md";

interface DormDetailsProps {
  dorm: any;
  means: any;
  images: string[];
}

export default function DormDetails({ dorm, means, images }: DormDetailsProps) {
  return (
    <>
      <div className="bg-background">
        <div
          className={`max-w-screen-2xl 2xl:mx-auto flex flex-col ${
            images.length !== 0
              ? "items-center lg:items-start"
              : "items-center justify-center"
          }`}
        >
          <div
            className={`w-full flex flex-col lg:flex-row gap-8 p-6 md:p-10 lg:p-14 ${
              images.length !== 0 ? "justify-between" : "justify-center"
            }`}
          >
            <div className="flex flex-col justify-start gap-6 pb-4 lg:pb-0">
              <div className="flex gap-4">
                <MdOutlineBed className="w-9 h-9" />
                <h1 className="text-4xl font-medium">{dorm.name}</h1>
              </div>
              <div>
                <Link
                  href={"/universities/" + dorm.university._id}
                  className="text-xl hover:underline"
                >
                  {dorm.university.name}
                </Link>
                <div className="flex gap-1">
                  <div className="flex items-center gap-2">
                    <BiMapPin />
                    <p className=" max-w-lg">{dorm.address},</p>
                  </div>
                  <Link
                    href={"/locations/" + dorm.location._id}
                    className="hover:underline"
                  >
                    {dorm.location?.name}
                  </Link>
                </div>
              </div>
              <DormMeans means={means} />
            </div>
            {images.length !== 0 && (
              <div className="max-w-4xl w-full lg:w-[55%]">
                <ImagesCarousel images={images} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
