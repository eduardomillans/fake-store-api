import { Product } from '@/product/product';

export type CreateProductAttributes = Pick<Product, 'categoryId' | 'title' | 'description' | 'priceInCents'>;

export abstract class ProductRepository {
    public abstract findMany(): Promise<Product[]>;
    public abstract create(attributes: CreateProductAttributes): Promise<Product>;
}