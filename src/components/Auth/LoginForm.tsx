"use client";

import { FnFormAction } from "@/types";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../UI/Button";
import InputText from "../UI/TextInput";
import { useForm } from "@/hooks/useForm";

const LoginForm: FC<{ action: FnFormAction }> = ({ action }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [state, changeHandler] = useForm({
    email: "",
    password: "",
  });

  const getFormData = () => {
    const formdata = new FormData();
    formdata.set("email", state.email);
    formdata.set("password", state.password);
    formdata.set('origin', window.location.origin)
    return formdata;
  };

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);

          const formdata = getFormData();

          try {
            toast.loading("Processing...");
            await action(formdata);
            toast.dismiss();
            toast.success("Check you mail inbox");
          } catch (err) {
            toast.dismiss();
            toast.error(`${err}`);
          } finally {
            setLoading(false);
          }
        }}
        className=" w-full md:w-4/5 space-y-2 md:space-y-4"
      >
        <InputText
          onChange={changeHandler}
          value={state.email}
          text="Email"
          type="email"
          name="email"
        />
        <InputText
          onChange={changeHandler}
          value={state.password}
          text="Password"
          type="password"
          name="password"
        />
        <input type="hidden" name="origin" value={window.location.origin} />
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          variant="primary"
        >
          {loading ? "processing..." : "Login"}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
