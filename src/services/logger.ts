import winston from "winston";

export class Logger {
    private logger: winston.Logger;

    constructor(level: string) {
        this.logger = winston.createLogger({
            level: level,
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                })
            ]
        });

        this.logger.info("Logger initialized");
    }

    info(message: string) {
        this.logger.info(message);
    }

    error(message: string) {
        this.logger.error(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }
}
