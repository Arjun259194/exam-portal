import { ReactNode } from "react";

interface Props {
  color: "red" | "blue" | "green";
  children: ReactNode;
}

export default function Tag(props: Props) {
  return (
    <span
      className={`py-0.5 px-2 text-sm rounded-lg text-white ${props.color === "red"
        ? "bg-red-600"
        : props.color === "blue"
          ? "bg-blue-600"
          : "bg-green-600"
        }`}
    >
      {props.children}
    </span>
  );
}
