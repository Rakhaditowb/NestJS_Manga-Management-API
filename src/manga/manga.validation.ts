import { z, ZodType } from 'zod';

export class MangaValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    author: z.string().min(1).max(100),
    status: z.string().min(1).max(100),
    release_date: z.preprocess((arg) => {
      if (typeof arg === 'string' || arg instanceof Date) {
        return new Date(arg);
      }
      return arg;
    }, z.date()),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    title: z.string().min(1).max(100),
    author: z.string().min(1).max(100).optional(),
    status: z.string().min(1).max(100).optional(),
    release_date: z
      .preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) {
          return new Date(arg);
        }
        return arg;
      }, z.date())
      .optional(),
  });
}
