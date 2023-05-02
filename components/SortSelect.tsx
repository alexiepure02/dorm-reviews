import { ORDER_BY_ENUM, ORDER_ENUM } from "@/common/Constants";
import useOutsideClick from "@/common/utils/hooks";
import { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";

interface SortSelectProps {
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
  handleOrderBy,
  handleOrder,
  handlePage,
}: SortSelectProps) => {
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState();

  const toggleOn = () => setToggle(true);
  const toggleOff = () => setToggle(false);

  const ref = useOutsideClick(toggleOff);

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
        ref={ref}
        className="flex items-center gap-2 w-full rounded bg-white px-3 py-2 ring-1 ring-gray-1"
        onClick={toggleOn}
      >
        <BiSortAlt2 className="w-8 h-8 text-gray-3" />
        {value && <h1 className="hidden md:block">{value}</h1>}
      </button>
      {toggle && (
        <ul
          ref={ref}
          className="z-2 absolute mt-2 w-48 right-0 rounded bg-white ring-1 ring-gray-1"
        >
          {options.map((option) => (
            <li
              className="cursor-pointer select-none p-2 hover:bg-hover"
              onClick={() => handleChange(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
