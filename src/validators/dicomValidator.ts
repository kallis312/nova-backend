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
          ).min(1)
        }).strict()
      )
    }).strict()
  ).refine(
    (slices) => {
      const sliceIndexes = slices.map((slice) => slice.sliceIndex);
      return new Set(sliceIndexes).size === sliceIndexes.length;
    },
    {
      message: "sliceIndex values must be unique",
    }
  )
}).strict();

export const reviewDicomValidator = z
  .object({
    status: z.enum(["accept", "reject"]),
  })
  .strict();

export type DicomAnnotation = z.infer<typeof dicomAnnotationVallidator>;
export type reviewDicomDto = z.infer<typeof reviewDicomValidator>;