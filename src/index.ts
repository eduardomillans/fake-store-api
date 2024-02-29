import'reflect-metadata';

import { Server } from '@/web/server';

async function boostrap() {
    const server = new Server();
    await server.start();
}

boostrap();