import { z } from 'zod';

const schema = z.object({
    NODE_ENV: z.enum(['development', 'production']),
    SERVER_PORT: z.string().transform(port => +port),
});

export const env = schema.parse(process.env);