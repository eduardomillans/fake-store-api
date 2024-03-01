import { sql } from '@/shared/database/postgres';
import { CategoryRepository, CreateCategoryAttributes } from '@/category/persistence/contracts/category.repository';
import { Category } from '@/category/category';

export class PostgresCategoryRepository implements CategoryRepository {
    public constructor() {}

    public async findMany(): Promise<Category[]> {
        return await sql<Category[]>`SELECT * FROM public.categories`;
    }

    public async create({ name, imageUrl }: CreateCategoryAttributes): Promise<Category> {
        const date = new Date();

        const [category] = await sql<Category[]>`
            INSERT INTO public.categories (name, image_url, created_at, updated_at)
            VALUES (${name}, ${imageUrl}, ${date}, ${date})
            RETURNING *
        `;

        return category;
    }
}