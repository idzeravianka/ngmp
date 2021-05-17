import { createLogger } from './create-logger';

const logger = createLogger('error');

export function controllerLogger(methodName: string, args: string, errorMessage: string) {
    const message = `Error in ${methodName}, where arguments is ${args} with error message - ${errorMessage}`;
    logger.error(message);
}
