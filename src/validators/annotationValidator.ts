import { z } from "zod";

export const medSAMActionValidator = z
  .object({
    dicomId: z.string(),
    sliceIndex: z.number(),
    dataType: z.string(),
    coordinates: z.array(z.array(z.number()).length(2)).min(1),
  })
  .strict();

export const monaiActionValidator = z
  .object({
    dicomId: z.string(),
    sliceIndex: z.number(),
    dataType: z.string(),
  })
  .strict();

export type medSAMActionDto = z.infer<typeof medSAMActionValidator>;
export type monaiActionDto = z.infer<typeof monaiActionValidator>;
