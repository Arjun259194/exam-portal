import { BookOpenCheck, BookText, Home, Info, LucideIcon, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import LogoutButton from "../Auth/LogoutButton";

interface ListItemProp {
  Icon: LucideIcon;
  path: string;
  text: string;
}

const ListItem: React.FC<ListItemProp> = ({ Icon, path, text }) => (
  <li>
    <Link className="flex transition-all items-center hover:translate-x-4 duration-500 hover:text-green-600 space-x-3" href={path}>
      <Icon className="size-5" />
      <span className="capitalize text-base">{text}</span>
    </Link>
  </li>
);

//TODO: Complite the IU

export const SideBar = () => {
  return (
    <aside className="flex flex-col justify-between text-gray-600 h-screen space-y-5 rounded-r-xl p-3">
      <div className="space-y-3">
        <div className="flex items-end space-x-3 text-3xl font-semibold underline capitalize">
          <BookOpenCheck className="size-7" /> <h1>Examify</h1>
        </div>
        <ul className="space-y-4">
          <ListItem Icon={Home} path="/" text="Home" />
          <ListItem Icon={Info} path="/about" text="about" />
          <ListItem Icon={BookText} path="/user/test" text="tests" />
          <ListItem Icon={UserRound} path="/user" text="Profile" />
        </ul>
      </div>

      <div className="">
        <LogoutButton className="self-end w-full" />
      </div>
    </aside>
  );
};
