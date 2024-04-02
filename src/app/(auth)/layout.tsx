import { getUserId } from "@/utils";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  getUserId()
  return <>{children}</>;
}
