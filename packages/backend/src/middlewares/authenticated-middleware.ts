import { env } from "hono/adapter";
import type { Context } from "hono";
import jwt from "jsonwebtoken";
import { createMiddleware } from "hono/factory";
import "dotenv/config";

const SECRET_KEY = process.env?.SECRET_KEY ?? "your_secret_key";

type User = {
  id: number;
  email: string;
};

export interface AuthenticatedContext extends Context {
  set(key: "user", value: User): void;
  get(key: "user"): User;
}

const authenticatedMiddleware = createMiddleware(async (c: AuthenticatedContext, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as User;
    c.set("user", decoded);
    await next();
  } catch (err) {
    return c.json({ message: "Invalid token" }, 401);
  }
});

export default authenticatedMiddleware;
