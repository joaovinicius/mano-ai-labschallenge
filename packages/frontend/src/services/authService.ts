import { SignInSchemaType } from "lib/schemas/auth";
import { UserType } from "lib/types/auth";
import { fetchApi } from "~/utils/fetchApi";

export function postSignin(payload: SignInSchemaType): Promise<{ message: string; data: string }> {
  return fetchApi("/auth/sign-in", { method: "POST", body: payload });
}

export function getMe(): Promise<{ message: string; data: UserType }> {
  return fetchApi("/auth/me");
}
