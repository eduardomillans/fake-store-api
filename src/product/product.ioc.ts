import { DependencyContainer } from 'tsyringe';
import { NonAbstractClass } from '@/shared/types';
import { ProductRepository } from '@/product/persistence/contracts/product.repository';
import { PostgresProductRepository } from '@/product/persistence/postgres-product.repository';

export function register(container: DependencyContainer) {
    container.register(ProductRepository as NonAbstractClass<ProductRepository>, PostgresProductRepository);
}