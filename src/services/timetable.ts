import { TimetableOption } from "../types/options";
import { WeekSchema } from "../types/schema";
import { Logger } from "./logger";
import { Session } from "./session";

export class Timetable{

    private session : Session;
    private logger : Logger;

    private readonly urlAuth = "https://timetable.sevsu.ru/api/getAuth"
    private readonly urlGet = "https://timetable.sevsu.ru/napi/StudentsRaspGet"


    constructor(option : TimetableOption){
        this.session = option.session;
        this.logger = option.logger;
    }

    private async getAuthToken() { 
        this.logger.info(`TimetableService: Getting from ${this.urlAuth}`);
        await this.session.client.get("https://timetable.sevsu.ru/auth/keycloak/redirect")  
        const response = await this.session.client.get(this.urlAuth)
        if (response.status == 200) {
            this.logger.info(`TimetableService: Auth token received`);
            return this.session.setTimetableToken(response.data);
        };

        throw new Error(`Timetable: Auth token invalid. Status code: ${response.status}. Comment: ${response.data}`)
    }

    getWeekNumber(date: Date): number {
        const startDate = new Date(date.getFullYear(), 0, 1); // первый день года
        const days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)); // количество дней с начала года
        return Math.ceil((days + 1) / 7); // номер недели
    }

    async get(date : Date = new Date()){
        if (!this.session.getTimetableToken()) await this.getAuthToken();
        const response = await this.session.client.post(
            this.urlGet, 
            {
                "session": this.session.getTimetableToken(),
                "week": this.getWeekNumber(date),
                "year": date.getFullYear(),
                "semestr": `${(date.getFullYear() -1) % 100}-${date.getFullYear() % 100}`
            }
        )
        if (response.status == 200) return WeekSchema.parse(response.data)
        throw new Error("Timetable: Invalid response")
    }
}