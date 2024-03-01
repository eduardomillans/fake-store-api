import { injectable } from 'tsyringe';
import { Feature } from '@/shared/types';
import { CategoryRepository } from '@/category/persistence/contracts/category.repository';
import { CreateCategoryDto } from '@/category/dtos/create-category.dto';
import { Category } from '@/category/category';

@injectable()
export class CreateCategory implements Feature<CreateCategoryDto, Category> {
    public constructor(private readonly repository: CategoryRepository) {}

    public async handle({ name, imageUrl }: CreateCategoryDto): Promise<Category> {
        return await this.repository.create({ name, imageUrl });
    }
}