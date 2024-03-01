import { injectable } from 'tsyringe';
import { Feature } from '@/shared/types';
import { CategoryRepository } from '@/category/persistence/contracts/category.repository';
import { Category } from '@/category/category';

@injectable()
export class FindManyCategories implements Feature<void, Category[]> {
    public constructor(private readonly repository: CategoryRepository) {}

    public async handle(): Promise<Category[]> {
        return this.repository.findMany();
    }
}