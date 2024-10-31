import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { SignInSchema } from "lib/schemas/auth";
import authenticatedMiddleware, { type AuthenticatedContext } from "~/middlewares/authenticated-middleware";
import { generateToken, getUserByEmail, validatePassword } from "~/services/authService";

import "dotenv/config";
const SECRET_KEY = process.env?.SECRET_KEY ?? "your_secret_key";

const app = new Hono();

app.get("/me", authenticatedMiddleware, async (c: AuthenticatedContext) => {
  const user = c.get("user");
  return c.json({ message: "Authenticated", data: user });
});

app.post("/sign-in", zValidator("json", SignInSchema), async (c) => {
  const { email, password } = c.req.valid("json");
  const user = await getUserByEmail(email);

  if (!user) {
    return c.json({ message: "Invalid username or password" }, 401);
  }

  const valid = await validatePassword(password, user.password);
  if (!valid) {
    return c.json({ message: "Invalid username or password" }, 401);
  }

  const token = await generateToken(user, SECRET_KEY);

  return c.json({ message: "Login successful", data: token }, 200);
});

export default app;
