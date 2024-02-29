import { RequestHandler } from 'express';

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type RoutePath = `/${string}`;

export type RouteMetadata = {
    method: HttpMethod;
    path: RoutePath;
    action: string;
    middlewares: RequestHandler[];
};

export type ControllerMetadata = {
    target: unknown;
    prefix: RoutePath;
    routes: RouteMetadata[];
    middlewares: RequestHandler[];
};