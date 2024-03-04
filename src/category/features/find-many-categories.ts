import { injectable } from 'tsyringe';
import { Feature } from '@/shared/types';
import { CategoryRepository } from '@/category/persistence/contracts/category.repository';
import { Category } from '@/category/category';

type FindManyCategoriesOutput = Array<Pick<Category, 'id' | 'name' | 'imageUrl'>>;

@injectable()
export class FindManyCategories implements Feature<void, FindManyCategoriesOutput> {
    public constructor(private readonly repository: CategoryRepository) {}

    public async handle(): Promise<FindManyCategoriesOutput> {
        const categories = await this.repository.findMany();

        return categories.map(category => ({
            id: category.id,
            name: category.name,
            imageUrl: category.imageUrl,
        }));
    }
}