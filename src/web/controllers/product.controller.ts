import { Request, Response } from 'express';
import { controller, httpGet, httpPost } from '@/shared/decorators/http';
import { RequestValidatorMiddleware } from '@/web/middlewares/request-validator.middleware';
import { FindManyProducts } from '@/product/features/find-many-products';
import { CreateProduct, createProductSchema } from '@/product/features/create-product';

@controller('/products')
export default class ProductController {
    public constructor(
        private readonly findManyProducts: FindManyProducts,
        private readonly createProduct: CreateProduct,
    ) {}

    @httpGet('/')
    public async findMany(_: Request, res: Response) {
        const products = await this.findManyProducts.handle();

        return res.json(products);
    }

    @httpPost('/', RequestValidatorMiddleware.with(createProductSchema))
    public async create(req: Request, res: Response) {
        const product = await this.createProduct.handle(req.body);

        return res.json(product);
    }
}