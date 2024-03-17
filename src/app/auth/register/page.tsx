import action from "./action";
import RegisterForm from "@/components/Auth/RegisterForm";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <main className="bg-1 min-h-screen flex justify-center items-center">
      <section className="bg-gray-50/80 space-y-3 flex flex-col min-w-80 w-2/5 p-5 px-10 rounded-xl border-2 border-gray-300 shadow-md justify-around items-center">
        <h1 className="text-5xl capitalize text-gray-800 font-bold">
          Register Form
        </h1>
        <p>New? Join us and have a flowless expireance</p>
        <RegisterForm action={action} />
        <p>
          Already have an account?{" "}
          <Link
            className="text-green-500 underline font-semibold capitalize"
            href="/auth/login"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}

export default page;
