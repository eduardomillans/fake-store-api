import type { Request, Response } from 'express';
import { controller, httpPost } from '@/shared/decorators/http';
import { validatorMiddleware } from '@/web/middlewares/validator.middleware';
import { createCategorySchema } from '@/category/dtos/create-category.dto';
import { CreateCategory } from '@/category/features/create-category';

@controller('/categories')
export default class CategoryController {
    public constructor(private readonly createCategory: CreateCategory) {}

    @httpPost('/', validatorMiddleware(createCategorySchema))
    public async create(req: Request, res: Response) {
        const category = await this.createCategory.handle(req.body);

        return res.json(category);
    }
}