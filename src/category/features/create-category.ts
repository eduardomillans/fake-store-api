import { injectable } from 'tsyringe';
import { z } from 'zod';
import { Feature } from '@/shared/types';
import { CategoryId } from '@/category/category';
import { CategoryRepository } from '@/category/persistence/contracts/category.repository';

export const createCategorySchema = z.object({
    name: z.string().min(1).max(255),
    imageUrl: z.string().min(1).url(),
});

type CreateCategoryInput = z.infer<typeof createCategorySchema>;

type CreateCategoryOutput = {
    id: CategoryId;
}

@injectable()
export class CreateCategory implements Feature<CreateCategoryInput, CreateCategoryOutput> {
    public constructor(private readonly repository: CategoryRepository) {}

    public async handle({ name, imageUrl }: CreateCategoryInput): Promise<CreateCategoryOutput> {
        const category = await this.repository.create({ name, imageUrl });

        return { id: category.id! };
    }
}