import { z } from 'zod';

export const userCreateValidator = z.object({
  username: z.string().min(4, "Username must be at least 4 characters."),
  password: z.string().min(4, "Password must be at least 4 characters."),
  confirmPassword: z.string().min(4, "Password must be at least 4 characters."),
  role: z.enum(['USER', 'ADMIN']).optional()
}).strict()
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Path of the error
  });


export const userUpdateValidator = z.object({
  username: z.string().min(4, "Username must be at least 4 characters."),
  role: z.enum(['USER', 'ADMIN']).optional()
}).strict()

export const userPasswordValidator = z.object({
  password: z.string().min(4, "Password must be at least 4 characters."),
  confirmPassword: z.string().min(4, "Password must be at least 4 characters.")
}).strict()
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Path of the error
  });
