import type { Request, Response, NextFunction } from 'express';

export function serializer() {
    return (_req: Request, _res: Response, next: NextFunction) => {
        BigInt.prototype.toJSON = function () {
            return this.toString();
        };

        next();
    };
}