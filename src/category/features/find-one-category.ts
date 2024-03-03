import { injectable } from 'tsyringe';
import { Feature } from '@/shared/types';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { CategoryRepository } from '@/category/persistence/contracts/category.repository';
import { Category, CategoryId } from '@/category/category';

type FindOneCategoryOutput = Pick<Category, 'id' | 'name' | 'imageUrl'>;

@injectable()
export class FindOneCategory implements Feature<CategoryId, FindOneCategoryOutput> {
    public constructor(private readonly repository: CategoryRepository) {}

    public async handle(id: CategoryId): Promise<FindOneCategoryOutput> {
        const category = await this.repository.findOne(id);

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        return {
            id: category.id!,
            name: category.name,
            imageUrl: category.imageUrl,
        };
    }
}