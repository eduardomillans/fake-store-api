import { Request, Response } from 'express';
import { controller, httpPost } from '@/shared/decorators/http';
import { RequestValidatorMiddleware } from '@/web/middlewares/request-validator.middleware';
import { CreateProduct, createProductSchema } from '@/product/features/create-product';

@controller('/products')
export default class ProductController {
    public constructor(private readonly createProduct: CreateProduct) {}

    @httpPost('/', RequestValidatorMiddleware.with(createProductSchema))
    public async create(req: Request, res: Response) {
        const product = await this.createProduct.handle(req.body);

        return res.json(product);
    }
}