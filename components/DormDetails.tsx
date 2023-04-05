import CustomRating from "./CustomRating";

interface DormDetailsProps {
  means: any;
}

export default ({ means }: DormDetailsProps) => {
  return (
    <div className="flex flex-col gap-6">
      <CustomRating
        initialRating={means.meanOverallRating}
        variant={1}
        decimals={2}
      />
      <div className="flex flex-col gap-2">
        <div>
          <h1>Cameră</h1>
          <CustomRating initialRating={means.meanRoomRating} variant={3} />
        </div>
        <div>
          <h1>Baie</h1>
          <CustomRating initialRating={means.meanBathRating} variant={3} />
        </div>
        <div>
          <h1>Bucătărie</h1>
          <CustomRating initialRating={means.meanKitchenRating} variant={3} />
        </div>
        <div>
          <h1>Locație</h1>
          <CustomRating initialRating={means.meanLocationRating} variant={3} />
        </div>
      </div>
    </div>
  );
};
