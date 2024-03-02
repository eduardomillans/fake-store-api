import { sql } from '@/shared/database/postgres';
import { CategoryRepository, CreateCategoryAttributes, UpdateCategoryAttributes } from '@/category/persistence/contracts/category.repository';
import { Category, CategoryId } from '@/category/category';

export class PostgresCategoryRepository implements CategoryRepository {
    public constructor() {}

    public async findMany(): Promise<Category[]> {
        return await sql<Category[]>`SELECT * FROM public.categories`;
    }

    public async findOne(id: NonNullable<Category['id']>): Promise<Category | null> {
        const [category] = await sql<[Category?]>`SELECT * FROM public.categories WHERE id = ${id}`;

        return category ?? null;
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

    public async update({ id, name, imageUrl }: UpdateCategoryAttributes): Promise<Category | null> {
        const date = new Date();

        const [category] = await sql<[Category?]>`
            UPDATE public.categories
            SET name = ${name}, image_url = ${imageUrl}, updated_at = ${date}
            WHERE id = ${id}
            RETURNING *
        `;

        return category ?? null;
    }

    public async delete(id: CategoryId): Promise<Category | null> {
        const [category] = await sql<[Category?]>`
            DELETE FROM public.categories WHERE id = ${id}
            RETURNING *
        `;

        if (!category) {
            return null;
        }

        return category;
    }
}