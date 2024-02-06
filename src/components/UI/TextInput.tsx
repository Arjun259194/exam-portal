import { ChangeEventHandler, FC, ReactNode } from "react";

interface Props {
    type: "text" | "email" | "password" | "number";
    name: string;
    text: string;
    required?: boolean;
    children?: ReactNode;
    onChange?: ChangeEventHandler<HTMLInputElement>
}


const InputText: FC<Props> = ({ children, type, required, name, text, onChange }) => {
    return (
        <div className="relative flex flex-col space-y-2">
            <label
                className="text-gray-500 font-semibold capitalize text-lg"
                htmlFor={name}>
                {text}
            </label>
            <input
                onChange={onChange}
                id={name}
                name={name}
                className="shadow-md focus:border-blue-500 border border-gray-400 text-base px-2 py-1 rounded-md outline-none"
                type={type}
                required={!!required}
                placeholder=" "></input>
            {children}
        </div>
    );
};

export default InputText;
