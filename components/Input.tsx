import { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";
import { BiHide, BiShow } from "react-icons/bi";

interface InputProps {
  className?: string;
  Icon: IconType;
  id: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>; // declare register props
  rules?: object;
}

export default ({
  className,
  Icon,
  id,
  type,
  placeholder,
  register,
  rules,
}: InputProps) => {
  const [show, setShow] = useState(false);

  const handleShowPassword = () => setShow(!show);

  return (
    <div className="relative">
      <Icon className="absolute top-1/2 translate-y-[-50%] left-4 text-primary-100" />
      <input
        className="w-full h-[54px] pl-10 px-4 rounded-md border-2 border-primary-800 focus:border-primary-100 outline-none"
        id={id}
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
