import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode } from "react";

type Input = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type Props = Omit<Input, "type"> & {
  text: string;
  type: "text" | "email" | "password" | "number";
};

const InputText: FC<Props> = ({ text, children, ...props }) => {
  return (
    <div className="relative flex flex-col space-y-2">
      <label
        className="text-gray-500 font-semibold capitalize text-lg"
        htmlFor={props.name}
      >
        {text}
      </label>
      <input
        {...props}
        className="shadow-md focus:border-blue-500 border border-gray-400 text-base px-2 py-1 rounded-md outline-none"
      ></input>
      {children}
    </div>
  );
};

export default InputText;
