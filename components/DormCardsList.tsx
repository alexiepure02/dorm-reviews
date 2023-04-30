import DormCard from "./DormCard";

interface DormCardProps {
  dorms: any;
}

export default ({ dorms }: DormCardProps) => {
  return dorms.length ? (
    <div className="container mx-auto grid justify-items-center sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 px-4 pb-8">
      {dorms.map((dorm: any, index: number) => (
        <DormCard dorm={dorm} />
      ))}
    </div>
  ) : (
    <div className="container mx-auto px-4">
      <h1>Nu sunt cămine aici.</h1>
    </div>
  );
};
