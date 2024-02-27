import { loginAction } from "@/action/loginAction";
import LoginForm from "@/components/Auth/LoginForm";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <main className="bg-1 min-h-screen flex justify-center items-center">
      <section className="bg-gray-50/80 space-y-3 flex flex-col min-w-80 w-2/5 p-5 px-10 rounded-xl border-2 border-gray-300 shadow-md justify-around items-center">
        <h1 className="text-5xl capitalize text-gray-800 font-bold">
          Login Form
        </h1>
        <p className="text-center">Welcome back! rejoin us in the perfact flow of study and work</p>
        <LoginForm action={loginAction} />
        <p>Don't have an account?  {" "}
        <Link className="text-green-500 underline font-semibold capitalize" href="/auth/register">Register</Link>
        </p>
      </section>
    </main>
  );
}

export default page;
