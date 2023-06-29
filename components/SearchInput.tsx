"use client";

import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import Turnstone from "turnstone";

const styles = {
  input:
    "w-full h-12 border-2 border-primary-800 py-2 pl-10 pr-7 text-xl outline-none rounded-md focus:border-primary-100",
  // inputFocus:
  //   "w-full h-12 border-x-0 border-t-0 border-b py-2 pl-10 pr-7 text-xl outline-none sm:rounded sm:border",
  typeahead: "text-gray-1",
  cancelButton: `absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 text-red-100 inline-flex sm:hidden`,
  clearButton:
    "absolute inset-y-0 right-0 w-8 inline-flex items-center justify-center text-gray-4 hover:text-gray-1",
  listbox:
    "w-full bg-white border border-primary-100 sm:rounded text-left mt-2 p-2 drop-shadow-xl z-[999]",
  groupHeading:
    "cursor-default mt-2 mb-0.5 px-1.5 uppercase text-sm text-primary-100 text-bold",
  item: "cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden",
  highlightedItem:
    "cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-black rounded bg-hover",
  match: "font-semibold",
  noItems: "cursor-default text-center my-10",
};

const maxItems = 10;

const LISTBOX = [
  {
    id: "locations",
    name: "Locații",
    ratio: 2,
    displayField: "name",
    data: async (query: string) => {
      const response = await fetch(
        `/api/locations/search?query=${encodeURIComponent(
          query
        )}&limit=${maxItems}`
      );
      const array = await response.json();
      return array.map((item: any) => ({ ...item, type: "locations" }));
    },
    searchType: "startswith",
  },
  {
    id: "universities",
    name: "Universități",
    ratio: 3,
    displayField: "name",
    data: async (query: string) => {
      const response = await fetch(
        `/api/universities/search?query=${encodeURIComponent(
          query
        )}&limit=${maxItems}`
      );
      const array = await response.json();
      return array.map((item: any) => ({
        ...item,
        name: item.name + " (" + item.acronym + ")",
        type: "universities",
      }));
    },
    searchType: "contains",
  },
  {
    id: "dorms",
    name: "Cămine",
    ratio: 5,
    displayField: "name",
    data: async (query: string) => {
      const response = await fetch(
        `/api/dorms/search?query=${encodeURIComponent(query)}&limit=${maxItems}`
      );
      const array = await response.json();
      return array.map((item: any) => ({
        ...item,
        name: item.name + " (" + item.university.acronym + ")",
        type: "dorms",
      }));
    },
    searchType: "contains",
  },
  {
    id: "users",
    name: "Utilizatori",
    ratio: 5,
    displayField: "username",
    data: (query: string) =>
      fetch(
        `/api/users/search?query=${encodeURIComponent(query)}&limit=${maxItems}`
      ).then((response) => response.json()),
    searchType: "contains",
  },
];

const Clear = () => <MdClear type="clear" className="w-6 h-6" />;

interface SearchInputProps {
  header?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  showLocations?: boolean;
  showUniversities?: boolean;
  showDorms?: boolean;
  showUsers?: boolean;
  setSelectedItem?: (item: string) => void;
}

export default ({
  header = false,
  autoFocus = false,
  placeholder,
  showLocations = true,
  showUniversities = true,
  showDorms = true,
  showUsers = false,
  setSelectedItem,
}: SearchInputProps) => {
  const [hasFocus, setHasFocus] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const turnstoneRef = useRef();

  let listbox = LISTBOX;

  if (!showLocations) {
    listbox = listbox.filter((source) => source.id !== "locations");
  }
  if (!showUniversities) {
    listbox = listbox.filter((source) => source.id !== "universities");
  }
  if (!showDorms) {
    listbox = listbox.filter((source) => source.id !== "dorms");
  }
  if (!showUsers) {
    listbox = listbox.filter((source) => source.id !== "users");
  }

  const containerStyles = `text-gray-4 relative w-full ${
    header
      ? ""
      : hasFocus
      ? "lg:w-8/12 xl:6/12 bg-transparent overflow-visible"
      : "lg:w-8/12 xl:6/12"
  }`;

  const iconDisplayStyle = hasFocus
    ? "inline-flex text-gray-4"
    : "inline-flex text-gray-2";

  const onChange = (query: string) =>
    query === "" && setSelectedItem && setSelectedItem("");
  const onBlur = () => setHasFocus(false);
  const onFocus = () => setHasFocus(true);

  const handleClear = () => {
    //@ts-ignore
    turnstoneRef.current?.clear();
  };

  const onSelect = (selectedItem: any) => {
    if (selectedItem) {
      if (setSelectedItem) {
        setSelectedItem(selectedItem._id);
      } else {
        if (pathname === "/" + selectedItem.type + "/" + selectedItem._id) {
          setTimeout(() => handleClear(), 250);
        } else {
          router.push("/" + selectedItem.type + "/" + selectedItem._id);
        }
      }
    }
  };
  return (
    <div className={containerStyles}>
      <span
        className={`absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-20 inline-flex ${iconDisplayStyle}`}
      >
        <BiSearchAlt className="w-6 h-6" />
      </span>
      <Turnstone
        ref={turnstoneRef}
        autoFocus={autoFocus}
        cancelButton={false}
        clearButton={true}
        debounceWait={150}
        id="autocomplete"
        listbox={listbox}
        listboxIsImmutable={false}
        matchText={true}
        maxItems={maxItems}
        noItemsMessage="Niciun rezultat găsit."
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={
          placeholder ? placeholder : header ? "Caută..." : "Caută un cămin"
        }
        styles={styles}
        Clear={Clear}
        onSelect={onSelect}
      />
    </div>
  );
};
