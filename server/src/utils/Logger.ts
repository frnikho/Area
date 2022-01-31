import logs4js from 'log4js';


export default class Logger {

    protected static instance: Logger;
    protected static logger: logs4js.Logger;

    private constructor() {
        Logger.logger = logs4js.getLogger("AREA");
        Logger.logger.level = 'debug';
        Logger.logger.info("Logger initialized");
    }

    private static init(category?: string) {
        if (Logger.instance === undefined || Logger.instance === null)
            Logger.instance = new Logger();
        if (category === undefined) {
            Logger.logger = logs4js.getLogger("AREA");
        } else {
            Logger.logger = logs4js.getLogger(category);
        }
        Logger.logger.level = 'debug';
    }

    public static e(category?: string, ...msg: string[]): void {
        this.init(category);
        msg.forEach((m) => Logger.logger.error(m));
    }

    public static d(category?: string, ...msg: string[]): void {
        this.init(category);
        msg.forEach((m) => Logger.logger.debug(m));
    }

    public static i(category?: string, ...msg: string[]): void {
        this.init(category);
        msg.forEach((m) => Logger.logger.info(m));
    }

}
