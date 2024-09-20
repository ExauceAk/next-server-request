import { EmailSchema, PasswordSchema } from '#/lib/validator';
import * as z from 'zod';

export const loginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
