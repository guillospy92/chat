import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

export const CORRELATION_ID_HEADER = 'X-Correlation-Id';

@Injectable()
export class CorrelationMiddleware implements NestMiddleware {
  use(req: Request, response: Response, next: () => void) {
    const id = randomUUID();
    req[CORRELATION_ID_HEADER] = id;
    response.set(CORRELATION_ID_HEADER, id);
    next();
  }
}
