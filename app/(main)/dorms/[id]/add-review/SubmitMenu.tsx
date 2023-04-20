import CustomRating from "@/components/CustomRating";

interface SubmitMenuProps {
  dormName: string;
  roomRating: number;
  roomComment: string;
  bathRating: number;
  bathComment: string;
  kitchenRating: number;
  kitchenComment: string;
  locationRating: number;
  locationComment: string;
  overallRating: number;
  comment: string;
}

export default ({
  dormName,
  roomRating,
  roomComment,
  bathRating,
  bathComment,
  kitchenRating,
  kitchenComment,
  locationRating,
  locationComment,
  overallRating,
  comment,
}: SubmitMenuProps) => {
  return (
    <div className="md:max-w-2xl rounded-lg flex flex-col bg-background sm:p-10 p-4 gap-8 text-start">
      <h1 className="text-4xl text-center">{dormName}</h1>
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl">Cameră</h1>
          <CustomRating rating={roomRating} />
        </div>
        <p>{roomComment}</p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl">Baie</h1>
          <CustomRating rating={bathRating} />
        </div>
        <p>{bathComment}</p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl">Bucătărie</h1>
          <CustomRating rating={kitchenRating} />
        </div>
        <p>{kitchenComment}</p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl">Locație</h1>
          <CustomRating rating={locationRating} />
        </div>
        <p>{locationComment}</p>
      </div>
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl">Evaluare generală</h1>
          <CustomRating rating={overallRating} variant={1} decimals={1} />
        </div>
        <p className="text-lg">{comment}</p>
      </div>
    </div>
  );
};
