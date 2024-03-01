import z from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(1).max(255),
    imageUrl: z.string().min(1).url(),
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;