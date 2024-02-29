import { z } from 'zod';

const schema = z.object({
    NODE_ENV: z.enum(['development', 'production']),
    SERVER_PORT: z.string().transform(port => +port),
    DB_HOST: z.string(),
    DB_PORT: z.string().transform(port => +port),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASS: z.string(),
});

export const env = schema.parse(process.env);