import { z } from 'zod';
import { injectable } from 'tsyringe';
import { Feature } from '@/shared/types';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { CategoryRepository } from '@/category/persistence/contracts/category.repository';
import { CategoryId } from '@/category/category';

export const deleteCategorySchema = z.object({
    id: z.custom<CategoryId>(value => parseInt(value as string) > 0, 'Invalid category id'),
});

type DeleteCategoryInput = z.infer<typeof deleteCategorySchema>;

type DeleteCategoryOutput = {
    id: CategoryId;
};

@injectable()
export class DeleteCategory implements Feature<DeleteCategoryInput, DeleteCategoryOutput> {
    public constructor(private readonly repository: CategoryRepository) { }

    public async handle({ id }: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
        const category = await this.repository.delete(id);

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        return { id: category.id };
    }
}