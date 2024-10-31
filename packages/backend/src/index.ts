import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import root from "~/routes/root";
import claims from "~/routes/claims";
import auth from "~/routes/auth";

const app = new Hono();

app.use("/api/*", cors());

app.route("", root);
app.route("/api/claims", claims);
app.route("/api/auth", auth);

serve({ fetch: app.fetch, port: 8080 });
console.log("Server is running on http://localhost:8080");
