import { Router } from 'express';
import type { InjectionToken } from 'tsyringe';
import { glob } from 'glob';
import { METADATA_KEY } from '@/shared/constants';
import type { ControllerMetadata } from '@/shared/types';
import { container } from '@/shared/ioc/container';

export const router = Router();

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

        router[route.method](`${prefix}${route.path}`, ...middlewares, instance[route.action].bind(instance));
    }
}