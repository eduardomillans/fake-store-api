import { z } from 'zod';

const schema = z.object({
    NODE_ENV: z.enum(['development', 'production'])
});

export const env = schema.parse(process.env);