import 'reflect-metadata';

import { container } from '@/shared/ioc';
import { Server } from '@/web/server';

async function boostrap() {
    const server = new Server(container);
    await server.start();
}

boostrap();