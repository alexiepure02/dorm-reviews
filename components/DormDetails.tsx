import CustomRating from "./CustomRating";

interface DormDetailsProps {
  means: any;
}

export default ({ means }: DormDetailsProps) => {
  return (
    <div className="flex flex-col gap-6">
      <CustomRating
        rating={means.meanOverallRating}
        variant={1}
        decimals={1}
      />
      <div className="flex flex-col gap-2">
        <div>
          <h1>Cameră</h1>
          <CustomRating rating={means.meanRoomRating} variant={3} />
        </div>
        <div>
          <h1>Baie</h1>
          <CustomRating rating={means.meanBathRating} variant={3} />
        </div>
        <div>
          <h1>Bucătărie</h1>
          <CustomRating rating={means.meanKitchenRating} variant={3} />
        </div>
        <div>
          <h1>Locație</h1>
          <CustomRating rating={means.meanLocationRating} variant={3} />
        </div>
      </div>
    </div>
  );
};
