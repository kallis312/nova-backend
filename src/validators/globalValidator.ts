import { z } from 'zod';

export const numIdValidator = z
  .union([
    z.string(),
    z.number()
  ])
  .pipe(z.coerce.number())