import { Request, Response } from 'express';
import { controller, httpDelete, httpGet, httpPost, httpPut } from '@/shared/decorators/http';
import { RequestValidatorMiddleware } from '@/web/middlewares/request-validator.middleware';
import { FindManyProducts } from '@/product/features/find-many-products';
import { FindOneProduct, findOneProductSchema } from '@/product/features/find-one-product';
import { CreateProduct, createProductSchema } from '@/product/features/create-product';
import { UpdateProduct, updateProductSchema } from '@/product/features/update-product';
import { DeleteProduct, deleteProductSchema } from '@/product/features/delete-product';

@controller('/products')
export default class ProductController {
    public constructor(
        private readonly findManyProducts: FindManyProducts,
        private readonly findOneProduct: FindOneProduct,
        private readonly createProduct: CreateProduct,
        private readonly updateProduct: UpdateProduct,
        private readonly deleteProduct: DeleteProduct,
    ) { }

    @httpGet('/')
    public async findMany(_: Request, res: Response) {
        const products = await this.findManyProducts.handle();

        return res.json(products);
    }

    @httpGet('/:id', RequestValidatorMiddleware.with(findOneProductSchema))
    public async findOne(req: Request, res: Response) {
        const product = await this.findOneProduct.handle(req.body);

        return res.json(product);
    }

    @httpPost('/', RequestValidatorMiddleware.with(createProductSchema))
    public async create(req: Request, res: Response) {
        const product = await this.createProduct.handle(req.body);

        return res.json(product);
    }

    @httpPut('/:id', RequestValidatorMiddleware.with(updateProductSchema))
    public async update(req: Request, res: Response) {
        const product = await this.updateProduct.handle(req.body);

        return res.json(product);
    }

    @httpDelete('/:id', RequestValidatorMiddleware.with(deleteProductSchema))
    public async delete(req: Request, res: Response) {
        const product = await this.deleteProduct.handle(req.body);

        return res.json(product);
    }
}