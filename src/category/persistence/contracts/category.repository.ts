import { Category } from '@/category/category';

export type CreateCategoryAttributes = Pick<Category, 'name' | 'imageUrl'>;

export abstract class CategoryRepository {
    public abstract create(attributes: CreateCategoryAttributes): Promise<Category>;
}