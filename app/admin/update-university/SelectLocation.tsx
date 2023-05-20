import SearchInput from "@/components/SearchInput";

interface SelectLocationProps {
  selectLocation: (locationId: string) => void;
}

export default function SelectLocation({
  selectLocation,
}: SelectLocationProps) {
  return (
    <>
      <SearchInput
        placeholder="Timișoara"
        showUniversities={false}
        showDorms={false}
        setSelectedItem={selectLocation}
      />
    </>
  );
}
