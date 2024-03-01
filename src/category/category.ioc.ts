import type { DependencyContainer } from 'tsyringe';
import type { NonAbstractClass } from '@/shared/types';
import { CategoryRepository } from '@/category/persistence/contracts/category.repository';
import { PostgresCategoryRepository } from '@/category/persistence/postgres-category.repository';

export function register(container: DependencyContainer) {
    container.register(CategoryRepository as NonAbstractClass<CategoryRepository>, PostgresCategoryRepository);
}