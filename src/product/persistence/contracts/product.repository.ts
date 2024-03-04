import { Product, ProductId } from '@/product/product';

export type CreateProductAttributes = Pick<Product, 'categoryId' | 'title' | 'description' | 'priceInCents'>;

export abstract class ProductRepository {
    public abstract findMany(): Promise<Product[]>;
    public abstract findOne(id: ProductId): Promise<Product | null>;
    public abstract create(attributes: CreateProductAttributes): Promise<Product>;
}