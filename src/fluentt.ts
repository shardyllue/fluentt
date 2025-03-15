import { Logger } from "./services/logger";
import { Session } from "./services/session";
import { Auth } from "./services/auth";
import { FluenttOption, SmartModeSession } from "./types/options";
import { Timetable } from "./services/timetable";


export class Fluentt {
    private loggerLevel = "silent"

    private session : Session;
    private logger : Logger;

    public auth : Auth;
    public timetable : Timetable;

    constructor(options : FluenttOption) {
        if (options.echoMode) this.loggerLevel = "info";

        this.logger = new Logger(this.loggerLevel);
        this.session = new Session({
            logger: this.logger,
            smartMode: options.smartMode
        });

        this.auth = new Auth({
            logger: this.logger,
            session: this.session
        });

        this.timetable = new Timetable({
            logger: this.logger,
            session: this.session
        })
    }

    saveSession(path : string) {
        this.session.save(path);
        this.logger.info("Session saved to " + path);
    }

    loadSession(path : string) {
        this.session.load(path);
        this.logger.info("Session loaded from " + path);
    }
}

