import logs4js = require('log4js');

export default class Logger {

    protected static instance: Logger;
    protected static logger: logs4js.Logger;

    private constructor() {
        Logger.logger = logs4js.getLogger("AREA");
        Logger.logger.level = 'debug';
        Logger.logger.info("Logger initialized");
    }

    private static init() {
        if (Logger.instance === undefined || Logger.instance === null)
            Logger.instance = new Logger();
        Logger.logger = logs4js.getLogger("AREA");
        Logger.logger.level = 'debug';
    }

    public static e(...msg: string[]): void {
        this.init();
        msg.forEach((m) => Logger.logger.error(m));
    }

    public static d(...msg: string[]): void {
        this.init();
        msg.forEach((m) => Logger.logger.debug(m));
    }

    public static i(...msg: string[]): void {
        this.init();
        msg.forEach((m) => Logger.logger.info(m));
    }

    public static w(...msg: string[]): void {
        msg.forEach((m) => Logger.logger.warn(m));
    }

}
