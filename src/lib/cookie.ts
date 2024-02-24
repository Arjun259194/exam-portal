import { cookies } from "next/headers";

export class AuthCookie {
    static new(token: string) {
        return cookies().set("auth", token, { path: "/", httpOnly: true, maxAge: 86400 })
    }

    
    public static get value() {
        return cookies().get("auth")?.value
    }

    static getToken() {
        return cookies().get("auth")?.value
    }
}