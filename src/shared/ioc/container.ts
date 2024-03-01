import { container } from 'tsyringe';
import { NonAbstractClass } from '@/shared/types';
import { CategoryRepository } from '@/category/persistence/contracts/category.repository';
import { PostgresCategoryRepository } from '@/category/persistence/postgres-category.repository';

container.register(CategoryRepository as NonAbstractClass<CategoryRepository>, PostgresCategoryRepository);

export default container;