import { z } from 'zod';

export const dicomAnnotationVallidator = z.object({
  slices: z.array(
    z.object({
      sliceIndex: z.number(),
      annotations: z.array(
        z.object({
          type: z.string(),
          label: z.string(),
          points: z.array(
            z.array(
              z.number()
            ).length(2)
          )
        }).strict()
      )
    }).strict()
  )
}).strict();

export const reviewDicomValidator = z
  .object({
    status: z.enum(["accept", "reject"]),
  })
  .strict();

export type DicomAnnotation = z.infer<typeof dicomAnnotationVallidator>;
export type reviewDicomDto = z.infer<typeof reviewDicomValidator>;