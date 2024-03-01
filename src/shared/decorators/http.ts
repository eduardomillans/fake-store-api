import type { RequestHandler } from 'express';
import { injectable } from 'tsyringe';
import { METADATA_KEY } from '@/shared/constants';
import type { ControllerMetadata, HttpMethod, RouteMetadata, RoutePath } from '@/shared/types';

export function controller(prefix: RoutePath, ...middlewares: RequestHandler[]): ClassDecorator {
    return target => {
        Reflect.decorate([injectable()] as ClassDecorator[], target);

        if (!Reflect.hasOwnMetadata(METADATA_KEY.CONTROLLER, Reflect)) {
            Reflect.defineMetadata(METADATA_KEY.CONTROLLER, [], Reflect);
        }

        if (!Reflect.hasOwnMetadata(METADATA_KEY.ROUTE, target)) {
            Reflect.defineMetadata(METADATA_KEY.ROUTE, [], target);
        }

        const routes: RouteMetadata[] = Reflect.getOwnMetadata(METADATA_KEY.ROUTE, target);
        const controllers: ControllerMetadata[] = Reflect.getOwnMetadata(METADATA_KEY.CONTROLLER, Reflect);

        controllers.push({ target, prefix, routes, middlewares });

        Reflect.defineMetadata(METADATA_KEY.CONTROLLER, controllers, Reflect);
    };
}

export function httpMethod(method: HttpMethod, path: RoutePath, ...middlewares: RequestHandler[]): MethodDecorator {
    return (target, propertyKey) => {
        if (!Reflect.hasOwnMetadata(METADATA_KEY.ROUTE, target.constructor)) {
            Reflect.defineMetadata(METADATA_KEY.ROUTE, [], target.constructor);
        }

        const routes: RouteMetadata[] = Reflect.getOwnMetadata(METADATA_KEY.ROUTE, target.constructor);

        routes.push({ method, path, middlewares, action: propertyKey as string });

        Reflect.defineMetadata(METADATA_KEY.ROUTE, routes, target.constructor);
    };
}

export function httpGet(path: RoutePath, ...middlewares: RequestHandler[]): MethodDecorator {
    return httpMethod('get', path, ...middlewares);
}

export function httpPost(path: RoutePath, ...middlewares: RequestHandler[]): MethodDecorator {
    return httpMethod('post', path, ...middlewares);
}

export function httpPut(path: RoutePath, ...middlewares: RequestHandler[]): MethodDecorator {
    return httpMethod('put', path, ...middlewares);
}

export function httpPatch(path: RoutePath, ...middlewares: RequestHandler[]): MethodDecorator {
    return httpMethod('patch', path, ...middlewares);
}

export function httpDelete(path: RoutePath, ...middlewares: RequestHandler[]): MethodDecorator {
    return httpMethod('delete', path, ...middlewares);
}