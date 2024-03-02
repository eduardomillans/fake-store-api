import { Category } from '@/category/category';

export type CreateCategoryAttributes = Pick<Category, 'name' | 'imageUrl'>;
export type UpdateCategoryAttributes = Required<Pick<Category, 'id' | 'name' | 'imageUrl'>>;

export abstract class CategoryRepository {
    public abstract findMany(): Promise<Category[]>;
    public abstract findOne(id: NonNullable<Category['id']>): Promise<Category | null>;
    public abstract create(attributes: CreateCategoryAttributes): Promise<Category>;
    public abstract update(attributes: UpdateCategoryAttributes): Promise<Category | null>;
}