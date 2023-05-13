import { BiCommentDetail } from "react-icons/bi";

interface ReviewMenuProps {
  dormName: string;
  comment: string;
  handleComment: (comment: string) => void;
}

export default ({ dormName, comment, handleComment }: ReviewMenuProps) => {
  return (
    <div className="relative md:max-w-2xl rounded-lg flex flex-col bg-background p-4 sm:p-10 gap-2 text-start">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <BiCommentDetail className="w-6 h-6" />
            <h1 className="text-2xl">Comentariu</h1>
          </div>
          <p className="text-gray-2">
            Lasă un comentariu în care îți spui opinia generală despre perioada
            în care ai stat la cămin.
          </p>
        </div>
        <h1 className="text-2xl">{dormName}</h1>
      </div>
      <textarea
        className="w-full h-[304px] resize-none p-4"
        placeholder="Lasă-ți aici amintirile (minim 100 de caractere)"
        value={comment}
        onChange={(e) => handleComment(e.target.value)}
      />
      {comment.length !== 0 && comment.length <= 100 && (
        <h1 className="absolute bottom-5 sm:bottom-11 right-6 sm:right-12 text-red-500">
          * necesare încă {100 - comment.length} caractere
        </h1>
      )}
    </div>
  );
};
