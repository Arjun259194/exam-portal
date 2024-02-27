"use server";
import LogoutButton from "@/components/Auth/LogoutButton";

function page() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl capitalize text-center">
        Page under development
      </h1>
      <p>Only authorized users can access this page</p>
      <LogoutButton variant="primary" />
    </div>
  );
}

export default page;
