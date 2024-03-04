import { injectable } from 'tsyringe';
import { z } from 'zod';
import { Feature } from '@/shared/types';
import { ProductId } from '@/product/product';
import { ProductRepository } from '@/product/persistence/contracts/product.repository';

export const createProductSchema = z.object({
    categoryId: z.string().uuid(),
    title: z.string().min(1).max(255),
    description: z.string(),
    priceInCents: z.coerce.bigint(),
});

type CreateProductInput = z.infer<typeof createProductSchema>;

type CreateProductOutput = {
    id: ProductId;
};

@injectable()
export class CreateProduct implements Feature<CreateProductInput, CreateProductOutput> {
    public constructor(private readonly repository: ProductRepository) {}

    public async handle({ categoryId, title, description, priceInCents }: CreateProductInput): Promise<CreateProductOutput> {
        const product = await this.repository.create({ categoryId, title, description, priceInCents });

        return { id: product.id! };
    }
}