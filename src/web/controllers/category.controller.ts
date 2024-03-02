import type { Request, Response } from 'express';
import { controller, httpDelete, httpGet, httpPost, httpPut } from '@/shared/decorators/http';
import { RequestValidatorMiddleware } from '@/web/middlewares/request-validator.middleware';
import { FindManyCategories } from '@/category/features/find-many-categories';
import { FindOneCategory } from '@/category/features/find-one-category';
import { CreateCategory } from '@/category/features/create-category';
import { UpdateCategory } from '@/category/features/update-category';
import { DeleteCategory } from '@/category/features/delete-category';
import { createCategorySchema } from '@/category/dtos/create-category.dto';
import { updateCategorySchema } from '@/category/dtos/update-category.dto';

@controller('/categories')
export default class CategoryController {
    public constructor(
        private readonly findManyCategories: FindManyCategories,
        private readonly findOneCategory: FindOneCategory,
        private readonly createCategory: CreateCategory,
        private readonly updateCategory: UpdateCategory,
        private readonly deleteCategory: DeleteCategory,
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

    @httpPut('/:id', RequestValidatorMiddleware.with(updateCategorySchema))
    public async update(req: Request, res: Response) {
        const category = await this.updateCategory.handle(req.body);

        return res.json(category);
    }

    @httpDelete('/:id')
    public async delete(req: Request, res: Response) {
        const { id } = req.params;

        const category = await this.deleteCategory.handle(id);

        return res.json(category);
    }
}