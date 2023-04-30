import UniversityCard from "./UniversityCard";

interface UniversityCardProps {
  universities: any;
}

export default ({ universities }: UniversityCardProps) => {
  console.log(universities);
  return (
    <div className="container mx-auto flex flex-col items-center 2xl:grid 2xl:grid-cols-2 gap-8 px-4 pb-8">
      {universities.length ? (
        universities.map((university: any, index: number) => (
          <UniversityCard university={university} />
        ))
      ) : (
        <h1>Nu sunt universități aici.</h1>
      )}
    </div>
  );
};
