import { sql } from '@/shared/database/postgres';
import { CreateProductAttributes, ProductRepository } from '@/product/persistence/contracts/product.repository';
import { Product } from '@/product/product';

export class PostgresProductRepository implements ProductRepository {
    public async create({ categoryId, title, description, priceInCents }: CreateProductAttributes): Promise<Product> {
        const date = new Date();

        const [product] = await sql<[Product]>`
            INSERT INTO public.products (category_id, title, description, price_in_cents, created_at, updated_at)
            VALUES (${categoryId}, ${title}, ${description}, ${priceInCents}, ${date}, ${date})
            RETURNING *
        `;

        return product;
    }
}