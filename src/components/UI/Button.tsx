import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: FC<ButtonProps> = ({ variant, className, children, ...props }) => {
  variant = variant || "primary"
  return (
    <button
      className={`
      active:scale-90
      rounded-lg border-2 py-1 px-2  capitalize transition-all duration-75 hover:brightness-110 font-semibold ${
        variant === "primary" ? "border-green-500 bg-green-500 text-green-50" : "border-green-500 bg-green-50 text-green-500"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
