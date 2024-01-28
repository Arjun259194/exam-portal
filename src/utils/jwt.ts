import jwt from "jsonwebtoken";

type TokenPayload = Parameters<typeof jwt.sign>[0];

export const newToken = (payload: TokenPayload) =>
  jwt.sign(payload, process.env.JWT_SECRET);

export const validToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET);
