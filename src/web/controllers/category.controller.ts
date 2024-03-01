import type { Request, Response } from 'express';
import { controller, httpGet, httpPost } from '@/shared/decorators/http';
import { RequestValidatorMiddleware } from '@/web/middlewares/request-validator.middleware';
import { createCategorySchema } from '@/category/dtos/create-category.dto';
import { CreateCategory } from '@/category/features/create-category';
import { FindManyCategories } from '@/category/features/find-many-categories';

@controller('/categories')
export default class CategoryController {
    public constructor(
        private readonly createCategory: CreateCategory,
        private readonly findManyCategories: FindManyCategories,
    ) {}

    @httpGet('/')
    public async findMany(_: Request, res: Response) {
        const categories = await this.findManyCategories.handle();

        return res.json(categories);
    }

    @httpPost('/', RequestValidatorMiddleware.with(createCategorySchema))
    public async create(req: Request, res: Response) {
        const category = await this.createCategory.handle(req.body);

        return res.json(category);
    }
}