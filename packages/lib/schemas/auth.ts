import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string({ required_error: "Email is required" }).min(1).max(40).email("Invalid email address"),
  password: z
    .string({ invalid_type_error: "Password is required" })
    .nonempty("Password is required")
    .min(6)
    .max(20)
    .regex(/(?=.*[0-9])(?=.*[a-zA-Z])/, "Passwords should contain at least one letter and one number"),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
