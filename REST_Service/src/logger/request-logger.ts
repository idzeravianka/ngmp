import { Request, Response, NextFunction } from 'express';
import { createLogger } from './create-logger';

const logger = createLogger('info');

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const { method, path, params, query, body } = req;
    const message = `[${method}] ${path} - params: ${JSON.stringify(params)}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`;
    logger.info(message);
    next();
}
