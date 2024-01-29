"use client";
import React from "react";
import Button from "../UI/Button";
import { useLogout } from "@/hooks/useLogout";

type Props = Omit<
  Parameters<typeof Button>[0],
  "onClick" | "children" | "disabled"
>;

function LogoutButton(props: Props) {
  const [loading, mutate] = useLogout();
  return (
    <Button disabled={loading} onClick={mutate} {...props}>
      {loading ? "Loading..." : <>Logout</>}
    </Button>
  );
}

export default LogoutButton;
