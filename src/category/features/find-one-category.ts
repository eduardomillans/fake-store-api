import { injectable } from 'tsyringe';
import { Feature } from '@/shared/types';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { CategoryRepository } from '@/category/persistence/contracts/category.repository';
import { Category } from '@/category/category';

@injectable()
export class FindOneCategory implements Feature<NonNullable<Category['id']>, Category> {
    public constructor(private readonly repository: CategoryRepository) {}

    public async handle(id: NonNullable<Category['id']>): Promise<Category> {
        const category = await this.repository.findOne(id);

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        return category;
    }
}