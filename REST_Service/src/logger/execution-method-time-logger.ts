import { createLogger } from './create-logger';

const logger = createLogger('info');

export function ExecutionMethodTimeLogger() {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const targetMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            logger.info(`method '${propertyKey}' is executed`);
            return targetMethod.apply(this, args);
        };

        return descriptor;
    };
}
