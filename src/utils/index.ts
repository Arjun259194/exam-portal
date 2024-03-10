import { AuthCookie } from "@/lib/cookie";
import { JWTToken } from "@/lib/jwt";

export function getUserId() {
  const token = AuthCookie.getToken();
  if(!token) return undefined
  const userId = JWTToken.valid(token)
  return userId
}
