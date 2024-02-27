"use client";

import { FnFormAction } from "@/types";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../UI/Button";
import InputText from "../UI/TextInput";

const LoginForm: FC<{ action: FnFormAction }> = ({ action }) => {
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    console.log("disable state:", disableBtn);
  }, [disableBtn]);

  function toggleBtnState() {
    setDisableBtn((prev) => !prev);
  }

  async function submitHandler(formData: FormData) {
    //TODO: the order of execution is fucked
    console.log("Function called");
    toast.success("Request made");

    console.log("button state:", disableBtn);

    action(formData)
      .then(() => {
        toast.success("Mail sent, check inbox");
      })
      .catch((err) => {
        console.error(err);
        toast.error(`${err}`);
      })
      .finally(() => {
        toggleBtnState()
      });
  }

  return (
    <form
      action={submitHandler}
      className=" w-full md:w-4/5 space-y-2 md:space-y-4"
    >
      <InputText text="Email" type="email" name="email" />
      <InputText text="Password" type="password" name="password" />
      <input type="hidden" name="origin" value={window.location.origin} />
      <Button
        type="submit"
        disabled={disableBtn}
        className="w-full"
        variant="primary"
        onClick={() => console.log("Button clicked")}
      >
        {disableBtn ? "processing..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
