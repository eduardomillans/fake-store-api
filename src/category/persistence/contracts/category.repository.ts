import { Category, CategoryId } from '@/category/category';

export type CreateCategoryAttributes = Pick<Category, 'name' | 'imageUrl'>;
export type UpdateCategoryAttributes = Pick<Category, 'id' | 'name' | 'imageUrl'>;

export abstract class CategoryRepository {
    public abstract findMany(): Promise<Category[]>;
    public abstract findOne(id: CategoryId): Promise<Category | null>;
    public abstract create(attributes: CreateCategoryAttributes): Promise<Category>;
    public abstract update(attributes: UpdateCategoryAttributes): Promise<Category | null>;
    public abstract delete(id: CategoryId): Promise<Category | null>;
}