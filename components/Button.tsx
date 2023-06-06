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
    className={`${className} rounded-full h-[44px] text-background bg-gradient-to-r shadow hover:shadow-lg ${
      disabled
        ? "from-linear-1-pale to-linear-2-pale"
        : "from-linear-1 to-linear-2"
    }`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
