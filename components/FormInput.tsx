import { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";
import { BiHide, BiShow } from "react-icons/bi";

interface InputProps {
  className?: string;
  Icon?: IconType;
  id: string;
  defaultValue?: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>; // declare register props
  rules?: object;
}

export default ({
  className,
  Icon,
  id,
  defaultValue = "",
  type,
  placeholder,
  register,
  rules,
}: InputProps) => {
  const [show, setShow] = useState(false);

  const handleShowPassword = () => setShow(!show);

  return (
    <div className="w-full relative">
      {Icon && (
        <Icon className="absolute top-1/2 translate-y-[-50%] left-4 text-primary-100" />
      )}
      <input
        className={`w-full h-[54px] px-4 rounded-md border-2 border-primary-800 focus:border-primary-100 placeholder-gray-1 outline-none ${
          Icon && "pl-10"
        }`}
        id={id}
        defaultValue={defaultValue}
        type={show ? "text" : type}
        placeholder={placeholder}
        {...register(id)}
        {...rules}
      />

      {type === "password" &&
        (show ? (
          <BiHide
            className="w-5 h-5 absolute top-1/2 translate-y-[-50%] right-4 text-primary-100"
            onClick={handleShowPassword}
          />
        ) : (
          <BiShow
            className="w-5 h-5 absolute top-1/2 translate-y-[-50%] right-4 text-primary-100"
            onClick={handleShowPassword}
          />
        ))}
    </div>
  );
};
