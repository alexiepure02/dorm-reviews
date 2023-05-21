"use client";

import { useState } from "react";
import UniversityCard from "./UniversityCard";
import Input from "./Input";
import { BiSearchAlt } from "react-icons/bi";
import { debounce } from "lodash";

interface UniversityCardsListProps {
  universities: any;
}

export default ({ universities }: UniversityCardsListProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    500
  );

  const filteredUniversities = universities.filter((university: any) => {
    const regex = new RegExp(searchValue, "i");
    return (
      !searchValue ||
      regex.test(university.name) ||
      regex.test(university.location.name)
    );
  });
  console.log(filteredUniversities);

  return (
    <div className="flex flex-col items-center py-4">
      <div className="w-full max-w-3xl md:w-1/2 p-4">
        <Input
          Icon={BiSearchAlt}
          id="search-value"
          type="text"
          placeholder="Caută o universitate"
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      {universities.length !== 0 ? (
        filteredUniversities.length !== 0 ? (
          <div className="max-w-screen-2xl 2xl:mx-auto flex flex-col items-center 2xl:grid 2xl:grid-cols-2 gap-8 p-4">
            {filteredUniversities.map((university: any, index: number) => (
              <UniversityCard key={index} university={university} />
            ))}
          </div>
        ) : (
          <h1>Ne pare rău, nu am avem universitatea pe care o cauți.</h1>
        )
      ) : (
        <h1>Nu sunt universități aici.</h1>
      )}
    </div>
  );
};
