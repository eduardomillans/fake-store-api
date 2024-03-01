export class Category {
    public id?: string;
    public name: string;
    public imageUrl: string;
    public createdAt: Date;
    public updatedAt: Date;

    public constructor(category: Partial<Category>) {
        this.id = category.id;
        this.name = category.name || '';
        this.imageUrl = category.imageUrl || '';
        this.createdAt = category.createdAt ?? new Date();
        this.updatedAt = category.updatedAt ?? new Date();
    }
}