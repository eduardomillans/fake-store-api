import { injectable } from 'tsyringe';
import { z } from 'zod';
import { Feature } from '@/shared/types';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { Product, ProductId } from '@/product/product';
import { ProductRepository } from '@/product/persistence/contracts/product.repository';

export const findOneProductSchema = z.object({
    id: z.custom<ProductId>(value => parseInt(value as string) > 0, 'Invalid product id'),
});

type FindOneProductInput = z.infer<typeof findOneProductSchema>;

type FindOneProductOutput = Pick<Product, 'id' | 'title' | 'description' | 'priceInCents'>;

@injectable()
export class FindOneProduct implements Feature<FindOneProductInput, FindOneProductOutput> {
    public constructor(private readonly repository: ProductRepository) { }

    public async handle({ id }: FindOneProductInput): Promise<FindOneProductOutput> {
        const product = await this.repository.findOne(id);

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        return product;
    }
}