import { PasswordSchema } from "#/lib/validator";
import * as z from "zod";

export const newPasswordSchema = z.object({
    password: PasswordSchema,
    confirmPassword: PasswordSchema,

});

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;