"use client";
import { RedirectType, redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../UI/Button";
import InputText from "../UI/TextInput";
import action from "@/app/auth/register/action";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  async function actionHandler(formData: FormData) {
    let isRedirect = false;
    try {
      const res = await action(formData);
      toast.success("User registered");
      if (res === "Request Sended to Admin\nYou will be notified on the given email") {
        isRedirect = false
      } else {
        isRedirect = true;
      }
      toast.success(res)
    } catch (error) {
      console.error(error)
      toast.error(`${error}`);
      isRedirect = false;
    }

    isRedirect ? redirect("/auth/login", RedirectType.push) : null;
  }

  return (
    <form
      action={actionHandler}
      className="space-y-2 w-full"
    >
      <InputText name="username" text="Username" type="text" required />
      <InputText name="email" text="Email" type="email" required />
      <div className="">
        <p className="text-gray-500 font-semibold capitalize text-lg">Role:</p>
        <div className="flex w-full items-center space-x-5">
          <label className="flex items-center space-x-1">
            <input type="radio" name="role" value="STUDENT" required />
            <span>STUDENT</span>
          </label>
          <label className="flex items-center space-x-1">
            <input type="radio" name="role" value="TEACHER" required />
            <span>TEACHER</span>
          </label>
        </div>
      </div>
      <InputText
        name="password"
        text="Password"
        type={!showPassword ? "password" : "text"}
        required
      >
        <button
          className="capitalize w-min gap-1 mx-1 text-blue-600"
          onClick={() => setShowPassword(!showPassword)}
          type="button"
        >
          {!showPassword ? "show" : "hide"}
        </button>
      </InputText>
      <Button className="w-full" variant="primary" type="submit">
        Continue
      </Button>
    </form>
  );
};

export default RegisterForm;
