import type { Request, Response } from 'express';
import { controller, httpGet } from '@/shared/decorators';

@controller('/healthcheck')
export default class HealthCheckController {
    @httpGet('/')
    public status(_: Request, res: Response) {
        return res.sendStatus(200);
    }
}