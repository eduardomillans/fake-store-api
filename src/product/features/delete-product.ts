import { injectable } from 'tsyringe';
import { z } from 'zod';
import { Feature } from '@/shared/types';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { ProductId } from '@/product/product';
import { ProductRepository } from '@/product/persistence/contracts/product.repository';

export const deleteProductSchema = z.object({
    id: z.custom<ProductId>(value => parseInt(value as string) > 0, 'Invalid product id'),
});

type DeleteProductInput = z.infer<typeof deleteProductSchema>;

type DeleteProductOutput = {
    id: ProductId;
};

@injectable()
export class DeleteProduct implements Feature<DeleteProductInput, DeleteProductOutput> {
    public constructor(private readonly repository: ProductRepository) { }

    public async handle({ id }: DeleteProductInput): Promise<DeleteProductOutput> {
        const product = await this.repository.delete(id);

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        return {
            id: product.id,
        };
    }
}