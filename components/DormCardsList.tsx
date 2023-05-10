import DormCard from "./DormCard";

interface DormCardProps {
  dorms: any;
}

export default ({ dorms }: DormCardProps) => {
  return dorms.length ? (
    <div className="max-w-screen-2xl 2xl:mx-auto grid justify-items-center sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 py-8 px-4 md:px-8 lg:px-12 pb-8">
      {dorms.map((dorm: any, index: number) => (
        <DormCard dorm={dorm} />
      ))}
    </div>
  ) : (
    <div className="max-w-screen-2xl 2xl:mx-auto px-4 md:px-8 lg:px-12">
      <h1>Nu sunt cămine aici.</h1>
    </div>
  );
};
