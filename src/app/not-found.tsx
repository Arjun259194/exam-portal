import { Contact, Home, SearchX } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="flex space-y-5 items-center justify-center flex-col container mx-auto py-40">
      <SearchX className="size-20" />
      <h1 className="text-4xl capitalize font-bold">404 - Not Found</h1>
      <p className="text-xl capitalize font-semibold text-gray-700">
        Oops! This page is not found. This page is either not available for
        under development. check URL or try again later.
      </p>
      <div className="flex space-x-5">
        <div className="flex flex-col items-center">
          <Link className="bg-green-500 text-gray-100 p-2 rounded-lg" href="/">
            <Home />
          </Link>
          <span>Home</span>
        </div>
        <div className="flex flex-col items-center">
          <Link
            className="bg-green-500 text-gray-100 p-2 rounded-lg"
            href="/contact"
          >
            <Contact />
          </Link>
          <span>Contant</span>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
