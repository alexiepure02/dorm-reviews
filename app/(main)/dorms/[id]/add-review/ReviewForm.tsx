"use client";

import { useState } from "react";

import CustomCarousel from "@/components/CustomCarousel";
import ReviewMenu from "./ReviewMenu";
import Button from "@/components/Button";
import SubmitMenu from "./SubmitMenu";
import {
  MdAddAPhoto,
  MdBed,
  MdKitchen,
  MdOutlineBathtub,
  MdOutlineLocationOn,
} from "react-icons/md";
import CommentMenu from "./CommentMenu";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import ImagesInput from "@/components/ImageInput";

interface ReviewFormProps {
  dorm: any;
}

export default ({ dorm }: ReviewFormProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [error, setError] = useState(
    ""
    // "Comentariul are mai puțin de 100 de caractere"
  );

  const [currentMenu, setCurrentMenu] = useState(0);
  const [roomRating, setRoomRating] = useState(0);
  const [roomComment, setRoomComment] = useState(
    ""
    // "Camera a fost extraordinara. Mi-a placut foarte mult. Sper ca la anul sa pot sta tot aici."
  );
  const [bathRating, setBathRating] = useState(0);
  const [bathComment, setBathComment] = useState(
    ""
    // "Nu mi-a placut foarte mult baia. A fost destul de murdara si nu era deloc apa calda. Doamna de servici ar trebui sa faca o treaba mai buna."
  );
  const [kitchenRating, setKitchenRating] = useState(0);
  const [kitchenComment, setKitchenComment] = useState(
    ""
    // "Bucataria a fost de vis. Aveai tot ce iti trebuia, de la farfurii, la tacamuri, la pahare, la tigai si oale."
  );
  const [locationRating, setLocationRating] = useState(0);
  const [locationComment, setLocationComment] = useState(
    ""
    // "Locatia a fost ok. Caminul este situat departe de universitate dar exista o sala la nici 2 minute distanta."
  );
  const [comment, setComment] = useState(
    ""
    // "Nu stiu ce sa scriu aici. Per total, mi-a placut caminul si camera in care am fost cazat. Colegii de camera si de camin au fost foarte prietenosi, iar administratorul e un om foarte chill. Mi-am facut amintiri de neuitat in acest camin."
  );
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const overallRating =
    (roomRating + bathRating + kitchenRating + locationRating) / 4;

  const nextMenu = () => setCurrentMenu(currentMenu + 1);
  const previousMenu = () => setCurrentMenu(currentMenu - 1);

  const updateCurrentMenu = (index: number) => {
    if (currentMenu !== index) {
      setCurrentMenu(index);
    }
  };

  const handleRoomRating = (rating: number) => {
    setRoomRating(rating);
  };

  const handleRoomComment = (comment: string) => {
    setRoomComment(comment);
  };

  const handleBathRating = (rating: number) => {
    setBathRating(rating);
  };

  const handleBathComment = (comment: string) => {
    setBathComment(comment);
  };

  const handleKitchenRating = (rating: number) => {
    setKitchenRating(rating);
  };

  const handleKitchenComment = (comment: string) => {
    setKitchenComment(comment);
  };

  const handleLocationRating = (rating: number) => {
    setLocationRating(rating);
  };

  const handleLocationComment = (comment: string) => {
    setLocationComment(comment);
  };

  const handleComment = (comment: string) => {
    setComment(comment);
  };

  const handleImages = (images: File[]) => {
    setImages(images);
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    let imageError: boolean = false;
    let imageIndexes: number[] = [];

    if (images.length !== 0) {
      const formData = new FormData();

      formData.append("name", dorm._id);

      images.forEach((image) => {
        formData.append("images", image);
      });

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/image`, {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        if (res.ok) {
          const response = await res.json();
          imageIndexes = response.indexes;
        } else {
          imageError = true;
          setError("Eroare la adăugarea imaginilor");
          return;
        }
      });
    }
    if (!imageError) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
        method: "POST",
        body: JSON.stringify({
          username: session?.user?.name,
          dorm: dorm.name,
          roomRating: roomRating,
          roomComment: roomComment,
          bathRating: bathRating,
          bathComment: bathComment,
          kitchenRating: kitchenRating,
          kitchenComment: kitchenComment,
          locationRating: locationRating,
          locationComment: locationComment,
          overallRating: overallRating,
          comment: comment,
          imageIndexes: imageIndexes,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setError(data.error);

          if (!data.error) {
            router.push(pathname + "/succesful");
          }
        });
    }
    setLoading(false);
  };

  return (
    <div className="md:max-w-2xl">
      <div className="flex justify-between py-4">
        <Button
          onClick={previousMenu}
          className="px-4"
          disabled={currentMenu === 0}
        >
          Înapoi
        </Button>
        <Button
          onClick={nextMenu}
          className="px-4"
          disabled={currentMenu === 5}
        >
          Înainte
        </Button>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 pb-4">
        <CustomCarousel
          selectedItem={currentMenu}
          onChange={updateCurrentMenu}
          emulateTouch={false}
          infiniteLoop={false}
          showIndicators={false}
          showArrows={false}
          showThumbs={false}
          dynamicHeight={true}
        >
          <CommentMenu
            dormName={dorm.name}
            comment={comment}
            handleComment={handleComment}
          />
          <ReviewMenu
            menuName="Cameră"
            MenuIcon={MdBed}
            helperText="Cât de comod e patul? Ai încălzire? Ai destul loc de depozitare? Ești bogătan cu frigider în cameră?"
            dormName={dorm.name}
            rating={roomRating}
            comment={roomComment}
            handleRating={handleRoomRating}
            handleComment={handleRoomComment}
          />
          <ReviewMenu
            menuName="Baie"
            MenuIcon={MdOutlineBathtub}
            helperText="Baie pe hol la comun sau privată proprie? S-a inventat apa caldă la duș? E destul de curat?"
            dormName={dorm.name}
            rating={bathRating}
            comment={bathComment}
            handleRating={handleBathRating}
            handleComment={handleBathComment}
          />
          <ReviewMenu
            menuName="Bucătărie"
            MenuIcon={MdKitchen}
            helperText="Furculițe? Cuțite? Oale? Tigăi? Aragaz? Cuptor? Sau doar îți comanzi mâncarea de la McDonald's."
            dormName={dorm.name}
            rating={kitchenRating}
            comment={kitchenComment}
            handleRating={handleKitchenRating}
            handleComment={handleKitchenComment}
          />
          <ReviewMenu
            menuName="Locație"
            MenuIcon={MdOutlineLocationOn}
            helperText="Ești aproape de universitate? Sunt magazine, cafenele, restaurante, săli de sport în apropiere?"
            dormName={dorm.name}
            rating={locationRating}
            comment={locationComment}
            handleRating={handleLocationRating}
            handleComment={handleLocationComment}
          />
          <SubmitMenu
            dormName={dorm.name}
            roomRating={roomRating}
            roomComment={roomComment}
            bathRating={bathRating}
            bathComment={bathComment}
            kitchenRating={kitchenRating}
            kitchenComment={kitchenComment}
            locationRating={locationRating}
            locationComment={locationComment}
            overallRating={overallRating}
            comment={comment}
          />
        </CustomCarousel>
        {currentMenu === 5 && (
          <>
            <div className="self-center w-full md:max-w-lg rounded-lg flex flex-col items-center bg-background p-4 sm:p-10 gap-4">
              <div className="flex items-center justify-center gap-2">
                <MdAddAPhoto className="text-gray-3 w-12 h-12 self-center" />
                <h1>Lasă câteva imagini împreună cu recenzia (opțional)</h1>
              </div>
              <ImagesInput
                newImages={images}
                handleNewImages={handleImages}
              />
            </div>
            <h1 className="self-center text-red-500">{error}</h1>
            <Button
              type="submit"
              disabled={loading}
              className="px-8 self-center"
            >
              {!loading ? "Adaugă recenzie" : "Se adaugă..."}
            </Button>
          </>
        )}
      </form>
    </div>
  );
};
