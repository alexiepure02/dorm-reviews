"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import Turnstone from "turnstone";

const styles = {
  input:
    "w-full h-12 border border-primary-800 py-2 pl-10 pr-7 text-xl outline-none rounded-md focus:border-primary-100",
  // inputFocus:
  //   "w-full h-12 border-x-0 border-t-0 border-b py-2 pl-10 pr-7 text-xl outline-none sm:rounded sm:border",
  query: "text-gray-3 placeholder-gray-2",
  typeahead: "text-gray-2",
  cancelButton: `absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 text-red-100 inline-flex sm:hidden`,
  clearButton:
    "absolute inset-y-0 right-0 w-8 inline-flex items-center justify-center text-gray-3 hover:text-gray-1",
  listbox:
    "w-full bg-white border border-primary-100 sm:rounded text-left mt-2 p-2 drop-shadow-xl",
  groupHeading:
    "cursor-default mt-2 mb-0.5 px-1.5 uppercase text-sm text-primary-100 text-bold",
  item: "cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden",
  highlightedItem:
    "cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-black rounded bg-hover",
  match: "font-semibold",
  noItems: "cursor-default text-center my-10",
};

const maxItems = 10;

const listbox = [
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
        name: item.name + ", " + item.location.name,
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
        name: item.name + ", " + item.university.name,
        type: "dorms",
      }));
    },
    searchType: "contains",
  },
];

const Clear = () => <MdClear type="clear" className="w-6 h-6" />;

export default () => {
  const [hasFocus, setHasFocus] = useState(false);
  const router = useRouter();

  const containerStyles = hasFocus
    ? "text-gray-3 relative w-full lg:w-8/12 xl:6/12 bg-transparent overflow-visible"
    : "text-gray-3 relative w-full lg:w-8/12 xl:6/12";

  const iconDisplayStyle = hasFocus
    ? "inline-flex text-gray-3"
    : "inline-flex text-gray-2";

  const onBlur = () => setHasFocus(false);
  const onFocus = () => setHasFocus(true);

  const onSelect = (selectedItem: any) =>
    selectedItem && router.push(selectedItem.type + "/" + selectedItem._id);

  return (
    <div className={containerStyles}>
      <span
        className={`absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 inline-flex ${iconDisplayStyle}`}
      >
        <BiSearchAlt className="w-6 h-6" />
      </span>
      <Turnstone
        autoFocus={true}
        cancelButton={false}
        clearButton={true}
        debounceWait={150}
        id="autocomplete"
        listbox={listbox}
        listboxIsImmutable={true}
        matchText={true}
        maxItems={maxItems}
        noItemsMessage="Niciun rezultat găsit."
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder="Caută un cămin"
        styles={styles}
        Clear={Clear}
        onSelect={onSelect}
      />
    </div>
  );
};