import { injectable } from 'tsyringe';
import { Feature } from '@/shared/types';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { UpdateCategoryDto } from '@/category/dtos/update-category.dto';
import { CategoryRepository } from '@/category/persistence/contracts/category.repository';
import { Category } from '@/category/category';

@injectable()
export class UpdateCategory implements Feature<UpdateCategoryDto, Category> {
    public constructor(private readonly repository: CategoryRepository) {}

    public async handle({ id, name, imageUrl }: UpdateCategoryDto): Promise<Category> {
        const category = await this.repository.update({ id, name, imageUrl });

        if (!category) {
            throw new NotFoundException('Category not found.');
        }

        return category;
    }
}