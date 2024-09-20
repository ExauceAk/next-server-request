import { EmailSchema, PasswordSchema, StringSchema } from "#/lib/validator";
import * as z from "zod";

export const registerSchema = z.object({
    officeName: StringSchema,
    officeEmail: EmailSchema,
    officePhoneNumber: StringSchema,
    ownerEmail: EmailSchema,
    ownerPassword: PasswordSchema,

});

export type RegisterSchema = z.infer<typeof registerSchema>;