import { z } from 'zod';

export const labelValidator = z.array(
  z.object({
    name: z.string(),
    color: z.string(),
  })
    .strict()
)

export const presetCreatValidator = z.object({
  name: z.string(),
  labels: labelValidator
})
  .strict();

export const presetUpdateValidator = z.object({
  name: z.string().optional(),
  labels: labelValidator
})
  .strict()