import type { Request, Response } from 'express';
import { controller, httpGet, httpPost } from '@/shared/decorators/http';
import { RequestValidatorMiddleware } from '@/web/middlewares/request-validator.middleware';
import { createCategorySchema } from '@/category/dtos/create-category.dto';
import { CreateCategory } from '@/category/features/create-category';
import { FindManyCategories } from '@/category/features/find-many-categories';
import { FindOneCategory } from '@/category/features/find-one-category';

@controller('/categories')
export default class CategoryController {
    public constructor(
        private readonly createCategory: CreateCategory,
        private readonly findManyCategories: FindManyCategories,
        private readonly findOneCategory: FindOneCategory,
    ) {}

    @httpGet('/')
    public async findMany(_: Request, res: Response) {
        const categories = await this.findManyCategories.handle();

        return res.json(categories);
    }

    @httpGet('/:id')
    public async findOne(req: Request, res: Response) {
        const { id } = req.params;

        const category = await this.findOneCategory.handle(id);

        return res.json(category);
    }

    @httpPost('/', RequestValidatorMiddleware.with(createCategorySchema))
    public async create(req: Request, res: Response) {
        const category = await this.createCategory.handle(req.body);

        return res.json(category);
    }
}