import { BiCommentDetail } from "react-icons/bi";

interface ReviewMenuProps {
  dormName: string;
  comment: string;
  handleComment: (comment: string) => void;
}

export default ({ dormName, comment, handleComment }: ReviewMenuProps) => {
  return (
    <div className="md:max-w-2xl rounded-lg flex flex-col bg-background sm:p-10 p-4 gap-2 text-start">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <BiCommentDetail className="w-6 h-6" />
            <h1 className="text-2xl">Comentariu</h1>
          </div>
        </div>
        <h1 className="text-2xl">{dormName}</h1>
      </div>
      <p className="text-gray-2">
        Aici poți lăsa un comentariu în care să îți spui opinia generală despre
        perioada în care ai stat la cămin.
      </p>
      <textarea
        className="w-full h-64 resize-none p-4"
        placeholder="Lasă-ți aici amintirile.."
        value={comment}
        onChange={(e) => handleComment(e.target.value)}
      />
    </div>
  );
};
