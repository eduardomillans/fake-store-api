import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ValidationException extends Error {
    public constructor(error: ZodError) {
        const { message } = fromZodError(error);

        super(message, { cause: error });
    }
}