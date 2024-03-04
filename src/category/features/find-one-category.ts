import { injectable } from 'tsyringe';
import { z } from 'zod';
import { Feature } from '@/shared/types';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { Category, CategoryId } from '@/category/category';
import { CategoryRepository } from '@/category/persistence/contracts/category.repository';

export const findOneCategorySchema = z.object({
    id: z.custom<CategoryId>(value => parseInt(value as string) > 0, 'Invalid category id'),
});

type FindOneCategoryInput = z.infer<typeof findOneCategorySchema>;

type FindOneCategoryOutput = Pick<Category, 'id' | 'name' | 'imageUrl'>;

@injectable()
export class FindOneCategory implements Feature<FindOneCategoryInput, FindOneCategoryOutput> {
    public constructor(private readonly repository: CategoryRepository) { }

    public async handle({ id }: FindOneCategoryInput): Promise<FindOneCategoryOutput> {
        const category = await this.repository.findOne(id);

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        return {
            id: category.id,
            name: category.name,
            imageUrl: category.imageUrl,
        };
    }
}