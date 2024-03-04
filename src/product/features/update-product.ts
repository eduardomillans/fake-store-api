import { injectable } from 'tsyringe';
import { z } from 'zod';
import { Feature } from '@/shared/types';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { Product, ProductId } from '@/product/product';
import { ProductRepository } from '@/product/persistence/contracts/product.repository';

export const updateProductSchema = z.object({
    id: z.custom<ProductId>(value => parseInt(value as string) > 0, 'Invalid product id'),
    categoryId: z.custom<Product['categoryId']>(value => parseInt(value as string) > 0, 'Invalid category id'),
    title: z.string().min(1).max(255),
    description: z.string(),
    priceInCents: z.number(),
});

type UpdateProductInput = z.infer<typeof updateProductSchema>;

type UpdateProductOutput = {
    id: ProductId;
};

@injectable()
export class UpdateProduct implements Feature<UpdateProductInput, UpdateProductOutput> {
    public constructor(private readonly repository: ProductRepository) { }

    public async handle({ id, categoryId, title, description, priceInCents }: UpdateProductInput): Promise<UpdateProductOutput> {
        const product = await this.repository.update({ id, categoryId, title, description, priceInCents });

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        return {
            id: product.id,
        }
    }
}