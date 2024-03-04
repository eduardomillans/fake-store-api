export type ProductId = Product['id'];

export class Product {
    public id: number;
    public categoryId: number;
    public title: string;
    public description: string;
    public priceInCents: number;
    public createdAt: Date;
    public updatedAt: Date;

    public constructor(product: Partial<Product>) {
        this.id = product.id ?? 0;
        this.categoryId = product.categoryId ?? 0;
        this.title = product.title ?? '';
        this.description = product.description ?? '';
        this.priceInCents = product.priceInCents ?? 0;
        this.createdAt = product.createdAt ?? new Date();
        this.updatedAt = product.updatedAt ?? new Date();
    }
}