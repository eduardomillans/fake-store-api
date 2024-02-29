import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

export class Server {
    private app?: express.Application;
    private server?: http.Server;

    public constructor() {
        this.setup();
    }

    private setup(): void {
        this.app = express();

        // Middlewares
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('dev'));

        // Routes
        this.app.use('/api/status', (_, res) => res.sendStatus(200));
    }

    public async start(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server = this.app?.listen(4000, () => {
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