"use client";

import { ORDER_BY_ENUM, ORDER_ENUM } from "@/common/Constants";
import useOutsideClick from "@/common/utils/hooks";
import { useRef, useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";

interface SortSelectProps {
  orderBy: ORDER_BY_ENUM;
  order: ORDER_ENUM;
  handleOrderBy: (orderBy: string) => void;
  handleOrder: (order: string) => void;
  handlePage: (page: number) => void;
}

const options = [
  {
    name: "Cele mai mari note",
    orderBy: ORDER_BY_ENUM.overallRating,
    order: ORDER_ENUM.desc,
  },
  {
    name: "Cele mai mici note",
    orderBy: ORDER_BY_ENUM.overallRating,
    order: ORDER_ENUM.asc,
  },
  {
    name: "Cele mai noi",
    orderBy: ORDER_BY_ENUM.createdAt,
    order: ORDER_ENUM.desc,
  },
  {
    name: "Cele mai vechi",
    orderBy: ORDER_BY_ENUM.createdAt,
    order: ORDER_ENUM.asc,
  },
];

export default ({
  orderBy: currentOrderBy,
  order: currentOrder,
  handleOrderBy,
  handleOrder,
  handlePage,
}: SortSelectProps) => {
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState();

  const toggleOff = () => {
    setToggle(false);
  };
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const ref = useRef<any>();

  useOutsideClick(ref, () => {
    toggleOff();
  });
  const handleChange = (option: any) => {
    setValue(option.name);
    handleOrderBy(option.orderBy);
    handleOrder(option.order);
    handlePage(0);
    toggleOff();
  };
  return (
    <div className="relative">
      <button
        className={`flex items-center gap-2 w-full rounded bg-white px-3 py-2 ring-1 ring-gray-1 hover:shadow-lg ${
          toggle ? "shadow-lg" : "shadow"
        }`}
        onClick={handleToggle}
      >
        <BiSortAlt2 className="w-8 h-8 text-gray-3" />
        {value && <h1 className="hidden md:block">{value}</h1>}
      </button>
      {toggle && (
        <div ref={ref}>
          <ul className="z-1 absolute mt-2 w-48 right-0 rounded bg-white ring-1 ring-gray-1 z-50 shadow-md">
            {options.map((option: any, index: number) => (
              <li
                key={index}
                className={`cursor-pointer select-none p-2 hover:bg-hover ${
                  option.orderBy === currentOrderBy &&
                  option.order === currentOrder &&
                  "bg-hover"
                }`}
                onClick={() => handleChange(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
