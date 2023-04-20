import CustomRatingInteractive from "@/components/CustomRatingInteractive";
import { IconType } from "react-icons";

interface ReviewMenuProps {
  menuName: string;
  MenuIcon: IconType;
  helperText: string;
  dormName: string;
  rating: number;
  comment: string;
  handleRating: (rating: number) => void;
  handleComment: (comment: string) => void;
}

export default ({
  menuName,
  MenuIcon,
  helperText,
  dormName,
  rating,
  comment,
  handleRating,
  handleComment,
}: ReviewMenuProps) => {
  return (
    <div className="md:max-w-2xl w-full rounded-lg flex flex-col bg-background sm:p-10 p-4 gap-2 text-start">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <MenuIcon className="w-6 h-6" />
            <h1 className="text-2xl">{menuName}</h1>
          </div>
          <CustomRatingInteractive
            rating={rating}
            variant={2}
            onClick={handleRating}
          />
        </div>
        <h1 className="text-2xl">{dormName}</h1>
      </div>
      <p className="text-gray-2">{helperText}</p>
      <textarea
        className="w-full h-64 resize-none p-4"
        placeholder="Lasă-ți aici amintirile.."
        value={comment}
        onChange={(e) => handleComment(e.target.value)}
      />
    </div>
  );
};
