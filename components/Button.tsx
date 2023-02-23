import { ButtonHTMLAttributes, ReactNode } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export default ({ type, className, onClick, children }: ButtonProps) => {
  return (
    <button
      className={
        "bg-gradient-to-r from-linear-1 to-linear-2 rounded-full h-[44px] text-background " +
        className
      }
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
