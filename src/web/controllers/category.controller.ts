import type { Request, Response } from 'express';
import { controller, httpPost } from '@/shared/decorators';
import { createCategorySchema } from '@/category/dtos/create-category.dto';
import { CreateCategory } from '@/category/features/create-category';

@controller('/categories')
export default class CategoryController {
    public constructor(private readonly createCategory: CreateCategory) {}

    @httpPost('/')
    public async create(req: Request, res: Response) {
        const { name, imageUrl } = createCategorySchema.parse(req.body);

        const category = await this.createCategory.handle({ name, imageUrl });

        return res.json(category);
    }
}