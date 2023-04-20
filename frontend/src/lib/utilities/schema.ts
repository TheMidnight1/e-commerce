import { z } from "zod";

export const loginSchema = z.object({
  login: z
    .string({ required_error: "Please enter your username or email address." })
    .trim()
    .min(1, "Please enter your username or email address.")
    .transform((v) => v.toLowerCase()),
  password: z
    .string({ required_error: "Please enter your password." })
    .trim()
    .min(1, "Please enter your password.")
    .min(6, "Invalid password.")
});
