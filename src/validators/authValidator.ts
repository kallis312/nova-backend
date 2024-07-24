import { z } from 'zod';

export const loginValidator = z.object({
  username: z.string().min(4, "Username must be at least 4 characters."),
  password: z.string().min(4, "Password must be at least 4 characters.")
}).strict();

export const registerValidator = z.object({
  username: z.string().min(4, "Username must be at least 4 characters."),
  password: z.string().min(4, "Password must be at least 4 characters"),
  confirmPassword: z.string().min(4, "Confirm Password must be at least 4 characters"),
}).strict()
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Path of the error
  });

export type LoginRequest = z.infer<typeof loginValidator>;
export type RegisterRequest = z.infer<typeof registerValidator>;