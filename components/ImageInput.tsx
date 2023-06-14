import { ChangeEvent, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";

interface ImagesInputProps {
  newImages: File[];
  handleNewImages: (images: File[]) => void;
}

export default function ImagesInput({
  newImages,
  handleNewImages,
}: ImagesInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files[0] === undefined) return;

    const files: File[] = [];

    for (let index = 0; index < e.target.files.length; index++) {
      files.push(e.target.files[index]);
    }

    handleNewImages(files);
  };

  const removeImage = (imageIndex: number) => {
    handleNewImages(
      newImages.filter((image: File, index: number) => index !== imageIndex)
    );
  };

  return (
    <div className="flex items-start gap-4">
      <div className="relative">
        <button
          type="button"
          className="relative z-2 bg-white cursor-pointer py-2 px-4 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100"
          onClick={handleFileSelect}
        >
          Adaugă
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {newImages.length !== 0 &&
          newImages.map((image: File, index: number) => (
            <div key={index} className="relative">
              <AiFillDelete
                className="absolute w-8 h-8 top-1 right-1 p-2 text-gray-4 bg-gray-1 bg-opacity-60 hover:bg-hover hover:bg-opacity-80 rounded-full cursor-pointer"
                onClick={() => {
                  removeImage(index);
                }}
              />
              <img src={URL.createObjectURL(image)} className="w-32" />
            </div>
          ))}
      </div>
    </div>
  );
}
