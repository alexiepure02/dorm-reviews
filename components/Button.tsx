import { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export default ({
  type = "button",
  className,
  onClick,
  disabled = false,
  children,
}: ButtonProps) => (
  <button
    className={
      disabled
        ? "bg-gradient-to-r from-linear-1-pale to-linear-2-pale rounded-full h-[44px] text-background " +
          className
        : "bg-gradient-to-r from-linear-1 to-linear-2 rounded-full h-[44px] text-background " +
          className
    }
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
