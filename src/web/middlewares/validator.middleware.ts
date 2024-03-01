import type { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { ValidationException } from '@/shared/exceptions/validation.exception';

export function validatorMiddleware(schema: ZodSchema) {
    return (req: Request, _: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            throw new ValidationException(error as ZodError);
        }
    };
}