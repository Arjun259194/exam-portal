import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type ReturnValue = [boolean, () => void];

export const useLogout = (): ReturnValue => {
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await axios.post("/api/auth/logout");
      window.location.reload();
    } catch (error) {
      console.error(error); // debug
      toast.error("someting went wrong");
    } finally {
      setLoading(false);
    }
  }

  return [loading, logout];
};
