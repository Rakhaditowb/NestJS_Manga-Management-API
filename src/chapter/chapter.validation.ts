import { ZodType, z } from 'zod';

export class ChapterValidation {
  static readonly CREATE: ZodType = z.object({
    manga_id: z.number().min(1).positive(),
    chapter_number: z.string().min(1),
    chapter_title: z.string().min(1).max(100),
    release_date: z.preprocess((arg) => {
      if (typeof arg === 'string' || arg instanceof Date) {
        return new Date(arg);
      }
      return arg;
    }, z.date()),
    page_count: z.string().min(1).max(100),
  });

  static readonly GET: ZodType = z.object({
    manga_id: z.number().min(1).positive(),
    chapter_id: z.number().min(1).positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().min(1).positive(),
    manga_id: z.number().min(1).positive(),
    chapter_number: z.string().min(1).optional(),
    chapter_title: z.string().min(1).max(100).optional(),
    release_date: z
      .preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) {
          return new Date(arg);
        }
        return arg;
      }, z.date())
      .optional(),
    page_count: z.string().min(1).max(100).optional(),
  });

  static readonly REMOVE: ZodType = z.object({
    manga_id: z.number().min(1).positive(),
    chapter_id: z.number().min(1).positive(),
  });
}
