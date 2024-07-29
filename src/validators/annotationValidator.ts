import { z } from "zod";

export const medSAMActionValidator = z
  .object({
    dicomId: z.string(),
    sliceIndex: z.number(),
    coordinates: z.array(
      z
        .object({
          x: z.number(),
          y: z.number(),
        })
        .strict()
    ),
  })
  .strict();

export const monaiActionValidator = z
  .object({
    dicomId: z.string(),
    sliceIndex: z.number(),
  })
  .strict();

export type medSAMActionDto = z.infer<typeof medSAMActionValidator>;
export type monaiActionDto = z.infer<typeof monaiActionValidator>;
