import { BookText, Home, Info, LucideIcon, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import LogoutButton from "../Auth/LogoutButton";
import { type User } from "@prisma/client";
import { Prettify } from "@/types";

interface ListItemProp {
  Icon: LucideIcon;
  path: string;
  text: string;
}

const ListItem: React.FC<ListItemProp> = ({ Icon, path, text }) => (
  <li>
    <Link
      className="flex transition-all p-2 rounded-lg border border-transparent hover:border-gray-200 items-center hover:translate-x-4 duration-500 hover:text-green-600 space-x-5 hover:bg-green-100"
      href={path}
    >
      <Icon className="size-5" />
      <span className="capitalize text-base">{text}</span>
    </Link>
  </li>
);

type Props = Prettify<Omit<User, "password">>;

export const SideBar: React.FC<Props> = ({ email, type, username }) => {
  return (
    <aside className="flex flex-col justify-between text-gray-600 h-screen space-y-5 rounded-r-xl p-3">
      <div className="space-y-5">
        <div className="flex flex-col space-y-1 border-2 border-gray-100 shadow-sm p-2 rounded-lg ">
          <span className="text-2xl capitalize font-semibold">{username}</span>
          <span className="text-sm text-gray-500">{email}</span>
        </div>
        <ul className="">
          <ListItem Icon={Home} path="/dashboard" text="Home" />
          <ListItem Icon={Info} path="/about" text="about" />
          {type === "TEACHER" && (
            <ListItem Icon={BookText} path="/test" text="tests" />
          )}
          <ListItem Icon={UserRound} path="/user" text="Profile" />
        </ul>
      </div>

      <div className="">
        <LogoutButton className="self-end w-full" />
      </div>
    </aside>
  );
};
