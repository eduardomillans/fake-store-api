export type ProductId = NonNullable<Product['id']>;

export class Product {
    public id?: string;
    public categoryId: string;
    public title: string;
    public description: string;
    public priceInCents: number;
    public createdAt: Date;
    public updatedAt: Date;

    public constructor(product: Partial<Product>) {
        this.id = product.id;
        this.categoryId = product.categoryId ?? '';
        this.title = product.title ?? '';
        this.description = product.description ?? '';
        this.priceInCents = product.priceInCents ?? 0;
        this.createdAt = product.createdAt ?? new Date();
        this.updatedAt = product.updatedAt ?? new Date();
    }
}