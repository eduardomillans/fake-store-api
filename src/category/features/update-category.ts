import { injectable } from 'tsyringe';
import { z } from 'zod';
import { Feature } from '@/shared/types';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { CategoryId } from '@/category/category';
import { CategoryRepository } from '@/category/persistence/contracts/category.repository';

export const updateCategorySchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1).max(255),
    imageUrl: z.string().min(1).url(),
});

type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

type UpdateCategoryOutput = {
    id: CategoryId;
};

@injectable()
export class UpdateCategory implements Feature<UpdateCategoryInput, UpdateCategoryOutput> {
    public constructor(private readonly repository: CategoryRepository) {}

    public async handle({ id, name, imageUrl }: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
        const category = await this.repository.update({ id, name, imageUrl });

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        return { id: category.id! };
    }
}