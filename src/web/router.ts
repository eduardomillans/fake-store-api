import express from 'express';
import type { DependencyContainer, InjectionToken } from 'tsyringe';
import { glob } from 'glob';
import { METADATA_KEY } from '@/shared/constants';
import type { ControllerMetadata } from '@/shared/types';

export class Router {
    public static routes(container: DependencyContainer) {
        const router = express.Router();

        // Dynamic loading of controllers
        glob.sync(`${__dirname}/**/*.controller.*`).forEach(controller => require(controller));

        // Register the routes with their respective controllers
        const controllers: ControllerMetadata[] | undefined = Reflect.getOwnMetadata(METADATA_KEY.CONTROLLER, Reflect);

        if (!controllers) {
            throw new Error(`No controllers have been found! Please ensure that you have register at least one Controller.`);
        }

        for (const { target, prefix, middlewares, routes } of controllers) {
            const instance = container.resolve(target as InjectionToken);

            for (const route of routes) {
                middlewares.push(...route.middlewares);

                router[route.method](`${prefix}${route.path}`, ...middlewares, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                    try {
                        await instance[route.action](req, res, next);
                    } catch (error) {
                        next(error);
                    }
                });
            }
        }

        return router;
    }
}