import jwt from "jsonwebtoken";

type TokenPayload = Parameters<typeof jwt.sign>[0];

export class JWTToken {
  static create = (payload: TokenPayload) =>
    jwt.sign(payload, process.env.JWT_SECRET);

  static valid = (token: string) => jwt.verify(token, process.env.JWT_SECRET);
}
