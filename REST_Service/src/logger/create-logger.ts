import winston from 'winston';
const { format, transports, addColors } = winston;

export const createLogger = (level: string) => winston.createLogger({
    level,
    format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(log => `${log.timestamp}: ${log.message}: ${log.level}`),
    ),
    transports: [
        new transports.Console()
    ]
});

addColors({
    error: 'red',
    info: 'yellow',
    debug: 'green'
});

