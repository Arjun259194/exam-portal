import Tests from "@/components/test/Tests";
import { getSessionUser } from "@/utils";

const page = async () => {
  const user = await getSessionUser();
  return <Tests user={user} />
};

export default page;
