import { sql } from '@/shared/database/postgres';
import { CreateProductAttributes, ProductRepository, UpdateProductAttributes } from '@/product/persistence/contracts/product.repository';
import { Product, ProductId } from '@/product/product';

export class PostgresProductRepository implements ProductRepository {
    public async findMany(): Promise<Product[]> {
        return sql<Product[]>`SELECT * FROM public.products ORDER BY created_at ASC`;
    }

    public async findOne(id: ProductId): Promise<Product | null> {
        const [product] = await sql<[Product?]>`SELECT * FROM public.products WHERE id = ${id}`;

        return product ?? null;
    }

    public async create({ categoryId, title, description, priceInCents }: CreateProductAttributes): Promise<Product> {
        const date = new Date();

        const [product] = await sql<[Product]>`
            INSERT INTO public.products (category_id, title, description, price_in_cents, created_at, updated_at)
            VALUES (${categoryId}, ${title}, ${description}, ${priceInCents}, ${date}, ${date})
            RETURNING *
        `;

        return product;
    }

    public async update({ id, categoryId, title, description, priceInCents }: UpdateProductAttributes): Promise<Product | null> {
        const date = new Date();

        const [product] = await sql<[Product?]>`
            UPDATE public.products
            SET category_id = ${categoryId}, title = ${title}, description = ${description}, price_in_cents = ${priceInCents}, updated_at = ${date}
            WHERE id = ${id}
            RETURNING *
        `;

        return product ?? null;
    }

    public async delete(id: ProductId): Promise<Product | null> {
        const [product] = await sql<[Product?]>`
            DELETE FROM public.products WHERE id = ${id}
            RETURNING *
        `;

        return product ?? null;
    }
}