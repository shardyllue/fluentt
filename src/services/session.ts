import fs from "fs";
import axios, { AxiosInstance } from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import { faker } from "@faker-js/faker";
import { Logger } from "./logger";
import { LocalSession, SessionOption, SmartModeSession } from "../types/options";


export class Session {

    private smartMode : SmartModeSession | undefined;
    private jar : CookieJar;
    private logger : Logger;
    public client : AxiosInstance;

    private local : LocalSession;

    constructor(options : SessionOption) 
    {
        this.logger = options.logger;
        this.smartMode = options.smartMode;
        

        this.jar = new CookieJar();
        this.client = wrapper(axios.create({ jar: this.jar }));
        this.local = {
            userAgent: faker.internet.userAgent(),
            timetableToken: undefined
        };

        if (this.smartMode) {
            this.logger.info("Session: SmartMode is enable")
            this.load(this.smartMode.pathFile)
        }
        this.logger.info("Session created");
    }

    public save(path : string) {
        const data = JSON.stringify({
            cookie: this.jar.toJSON(),
            local: this.local 
        });
        fs.writeFileSync(path, data, {
            encoding: "utf-8"
        });
    }

    public load(path : string) {
        if (!fs.existsSync(path)) {
            this.logger.info("Session: File not found. Nothing to do.")
            return;
        }
        const data = JSON.parse(fs.readFileSync(path, {encoding: "utf-8"}));
        this.jar = CookieJar.fromJSON(data.cookie);
        this.local = data.local || {}
    }

    setTimetableToken(token : string) {
        this.local.timetableToken = token;
        if (this.smartMode) this.save(this.smartMode.pathFile);
    }

    getTimetableToken() {
        return this.local?.timetableToken;
    }

    setUserAgent(usdrAgent : string) {
        this.local.userAgent = usdrAgent;
        if (this.smartMode) this.save(this.smartMode.pathFile);
    }

    getUserAgent() {
        return this.local?.userAgent;
    }
}