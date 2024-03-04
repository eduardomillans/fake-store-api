import { injectable } from 'tsyringe';
import { Feature } from '@/shared/types';
import { ProductRepository } from '@/product/persistence/contracts/product.repository';
import { Product } from '@/product/product';

type FindManyProductsOutput = Array<Pick<Product, 'id' | 'title' | 'description' | 'priceInCents'>>;

@injectable()
export class FindManyProducts implements Feature<void, FindManyProductsOutput> {
    public constructor(private readonly repository: ProductRepository) {}

    public async handle(): Promise<FindManyProductsOutput> {
        const products = await this.repository.findMany();

        return products.map(product => ({
            id: product.id!,
            title: product.title,
            description: product.description,
            priceInCents: product.priceInCents,
        }));
    }
}