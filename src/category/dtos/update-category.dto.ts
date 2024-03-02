import z from 'zod';

export const updateCategorySchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1).max(255),
    imageUrl: z.string().min(1).url(),
});

export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;