import { Product, ProductId } from '@/product/product';

export type CreateProductAttributes = Pick<Product, 'categoryId' | 'title' | 'description' | 'priceInCents'>;
export type UpdateProductAttributes = Pick<Product, 'id' | 'categoryId' | 'title' | 'description' | 'priceInCents'>;

export abstract class ProductRepository {
    public abstract findMany(): Promise<Product[]>;
    public abstract findOne(id: ProductId): Promise<Product | null>;
    public abstract create(attributes: CreateProductAttributes): Promise<Product>;
    public abstract update(attributes: UpdateProductAttributes): Promise<Product | null>;
    public abstract delete(id: ProductId): Promise<Product | null>;
}