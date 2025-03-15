import { Logger } from "../services/logger"
import { Session } from "../services/session"

export interface FluenttOption {
    echoMode? : boolean,
    smartMode? : SmartModeSession
}

export interface SmartModeSession {
    pathFile : string
}

export interface SessionOption {
    logger : Logger,
    smartMode? : SmartModeSession,
}

export interface AuthOption {
    logger : Logger,
    session : Session,
}

export interface TimetableOption {
    logger : Logger,
    session : Session,
}

export interface LocalSession {
    userAgent? : string,
    timetableToken? : string,

}