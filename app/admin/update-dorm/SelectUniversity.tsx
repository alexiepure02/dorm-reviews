import SearchInput from "@/components/SearchInput";

interface SelectUniversityProps {
  selectUniversity: (universityId: string) => void;
}

export default function SelectUniversity({
  selectUniversity,
}: SelectUniversityProps) {
  return (
    <>
      <SearchInput
        placeholder="Universitatea de Vest Timișoara"
        showLocations={false}
        showDorms={false}
        setSelectedItem={selectUniversity}
      />
    </>
  );
}
