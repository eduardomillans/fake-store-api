import postgres from 'postgres';
import { env } from '@/shared/env';

export const sql = postgres({
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASS,
    transform: postgres.camel,
});