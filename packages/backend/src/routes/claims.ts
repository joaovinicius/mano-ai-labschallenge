import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { CsvClaimsSchema } from "lib/schemas/claims";
import { createClaims, getClaimByFileName, listClaims, listClaimsByUserId, searchClaims, deleteMyFileName, updateFileContent } from "~/services/claimService";
import authenticatedMiddleware, { type AuthenticatedContext } from "~/middlewares/authenticated-middleware";
import { validator } from "hono/validator";
import { validateJsonString } from "lib/utils/validators";
import type { CsvClaimType } from "lib/types/claims";
import fileOwnerMiddleware from "~/middlewares/file-owner-middleware";

const app = new Hono();

app.get("/", async (c) => {
  const search = c.req.query("q");
  const items = search ? await searchClaims(search) : await listClaims();
  return c.json({ data: items });
});

app.get("/mine", authenticatedMiddleware, async (c: AuthenticatedContext) => {
  const user = c.get("user");
  const items = await listClaimsByUserId(user.id);
  return c.json({ data: items });
});

app.get("/:fileName", async (c) => {
  const file = await getClaimByFileName(c.req.param("fileName"));
  return c.json({ data: file });
});

interface ClaimContext extends AuthenticatedContext {
  req: any;
}
app.post("/", authenticatedMiddleware, zValidator("json", CsvClaimsSchema), async (c: ClaimContext) => {
  const validated = c.req.valid("json");
  const user = c.get("user");
  await createClaims(user.id, validated as unknown as CsvClaimType[]);
  return c.json({ message: "Claims created!" }, 201);
});

app.put(
  "/:fileName",
  authenticatedMiddleware,
  fileOwnerMiddleware,
  validator("json", (value, c) => {
    if (!validateJsonString(value)) {
      return c.json({ message: "Invalid json format" }, 400);
    }
    return { json: value };
  }),
  async (c) => {
    const { json } = c.req.valid("json");
    const file = await updateFileContent(c.req.param("fileName"), json);
    return c.json({ data: file });
  },
);

app.delete("/:fileName", authenticatedMiddleware, fileOwnerMiddleware, async (c: AuthenticatedContext) => {
  const user = c.get("user");
  if (!c.req.param("fileName").startsWith(`${user.id}_`)) {
    throw new Error("You can only delete your own files");
  }
  await deleteMyFileName(c.req.param("fileName"));
  return c.json({ message: "Claim deleted!" });
});

export default app;
