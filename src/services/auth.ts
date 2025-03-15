
import * as cheerio from "cheerio";
import { AuthOption } from "../types/options";
import { Session } from "./session";
import { Logger } from "./logger";


export class Auth {
    
    private readonly urlLogin : string = "https://lk.sevsu.ru/user/sign-in/login"
    private readonly contentType: string = "application/x-www-form-urlencoded"
    private session : Session;
    private logger : Logger;

    constructor(options : AuthOption) 
    {
        this.logger = options.logger;
        this.session = options.session;
    }

    private async getLoginUrl() : Promise<string | undefined> {
        this.logger.info(`AuthService: Getting a login url`)
        const loginData = await this.session.client.get(this.urlLogin)

        this.logger.info(`AuthService: Parse a login url`)
        const $ = cheerio.load(loginData.data);

        return $("form").attr("action")
    }


    public async login(username : string, password : string) {
        const loginUrl = await this.getLoginUrl();

        if (!loginUrl) throw Error("A login url is invalid");

        this.logger.info(`AuthService: Login with username ${username} and password ${password}`)
        const response = await this.session.client.post(loginUrl, 
            {
                username : username,
                password: password,
                credentialId : "1",
            },
            {
                headers : {
                    "User-Agent" : this.session.getUserAgent(),
                    "Content-Type": this.contentType
                },
                validateStatus: status => true
            }
        )
        
        if (response.status != 200) throw Error("Auth failed")

        this.logger.info(`AuthService: Login success`)
    }
}