import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import type { DependencyContainer } from 'tsyringe';
import { env } from '@/shared/env';
import { ValidationException } from '@/shared/exceptions/validation.exception';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { Router } from '@/web/router';
import { serializer } from '@/web/middlewares/serializer.middleware';

export class Server {
    private app?: express.Application;
    private server?: http.Server;

    public constructor(private readonly container: DependencyContainer) {
        this.setup();
    }

    private setup(): void {
        this.app = express();

        // Set middlewares
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(serializer());

        // Set router
        this.app.use('/api', Router.routes(this.container));

        // Catch errors
        this.app.use((error: express.ErrorRequestHandler, _: express.Request, res: express.Response, next: express.NextFunction) => {
            if (error instanceof ValidationException) {
                return res.status(400).json({ message: error.message });
            }

            if (error instanceof NotFoundException) {
                return res.status(404).json({ message: error.message });
            }

            if (error instanceof Error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }

            next();
        });
    }

    public async start(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server = this.app?.listen(env.SERVER_PORT, () => {
                console.log('🚀 Server is up and running');
                resolve();
            });

            this.server?.on('error', reject);
        });
    }

    public async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log('Shutting down server...');

            if (!this.server) {
                return resolve();
            }

            this.server.close(error => {
                if (error) {
                    return reject(error);
                }

                resolve();
            });
        });
    }
}