import { createLogger } from './create-logger';

export function unhandledErrorLogger(message: string) {
    const logger = createLogger('error');
    logger.error(message);
}

export function debugLogger(message: string) {
    const logger = createLogger('debug');
    logger.debug(message);
}

