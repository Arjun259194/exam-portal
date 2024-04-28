import {
   BookText,
   Home,
   Info,
   LucideIcon,
   Lock,
   UserRound,
} from "lucide-react";
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
         className="flex transition-all p-2 rounded-lg border border-transparent hover:border-gray-200 items-center hover:translate-x-4 duration-500 hover:text-green-600 space-x-5 hover:bg-gray-100 hover:font-semibold"
         href={path}
      >
         <Icon className="size-5" />
         <span className="capitalize text-base">{text}</span>
      </Link>
   </li>
);

type Props = Prettify<Omit<User, "password">>;

export const SideBar = ({ email, type, username }: Props) => {
   return (
      <aside className="flex bg-green-500 flex-col justify-between text-gray-600 h-screen space-y-5 rounded-r-xl p-3">
         <div className="space-y-5">
            <div className="flex flex-col bg-gray-50 space-y-1 border-2 border-gray-100 shadow-sm p-2 rounded-lg ">
               <span className="text-2xl capitalize font-semibold">{username}</span>
               <span className="text-sm text-gray-500">{email}</span>
            </div>
            <ul className="text-white">
               <ListItem Icon={Home} path="/dashboard" text="Home" />
               <ListItem Icon={Info} path="/about" text="about" />
               {type === "TEACHER" && (
                  <ListItem Icon={BookText} path="/test" text="tests" />
               )}
               {type === "ADMIN" && (
                  <ListItem Icon={Lock} path="/admin" text="admin" />
               )}
               {type === "STUDENT" && (
                  <ListItem Icon={UserRound} path="/profile" text="Profile" />
               )}
            </ul>
         </div>

         <div className="">
            <LogoutButton variant="secondary" className="self-end w-full" />
         </div>
      </aside>
   );
};
