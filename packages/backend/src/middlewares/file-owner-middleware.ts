import { createMiddleware } from "hono/factory";
import "dotenv/config";
import type { AuthenticatedContext } from "~/middlewares/authenticated-middleware";

const fileOwnerMiddleware = createMiddleware(async (c: AuthenticatedContext, next) => {
  const user = c.get("user");
  const fileName = c.req.param("fileName")
  if (!fileName.startsWith(`${user.id}_`)) {
    return c.json({ message: "You are not the owner of this file" }, 401);
  }
  await next();
});

export default fileOwnerMiddleware;
