import jwt from "jsonwebtoken";

type TokenPayload = Parameters<typeof jwt.sign>[0];

export class JWTToken {
  static create = (payload: TokenPayload) =>
    jwt.sign(payload, process.env.JWT_SECRET);

  static valid = (token: string): string | undefined => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET) as string
    } catch (error) {
      console.error("Not a valid token")
      return undefined
    }
  }

}
