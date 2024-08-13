import { z } from 'zod';

export const userValidator = z.object({
  username: z.string().min(4, "Username must be at least 4 characters."),
  password: z.string().min(4, "Password must be at least 4 characters."),
  role: z.enum(['USER', 'ADMIN']).optional()
}).strict();

export type UserRequest = z.infer<typeof userValidator>;