export type CategoryId = Category['id'];

export class Category {
    public id: number;
    public name: string;
    public imageUrl: string;
    public createdAt: Date;
    public updatedAt: Date;

    public constructor(category: Partial<Category>) {
        this.id = category.id ?? 0;
        this.name = category.name ?? '';
        this.imageUrl = category.imageUrl ?? '';
        this.createdAt = category.createdAt ?? new Date();
        this.updatedAt = category.updatedAt ?? new Date();
    }
}