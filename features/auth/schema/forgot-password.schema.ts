import { EmailSchema } from "#/lib/validator";
import * as z from "zod";

export const forgotPasswordSchema = z.object({
    email: EmailSchema,
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;