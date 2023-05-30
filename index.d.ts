declare module '@dayao2525/logger' {
  import { Telegraf } from "telegraf";
  import type winston from "winston";
  export interface LoggerInstance {
    error: winston.LeveledLogMethod;
    log: winston.LeveledLogMethod;
  }
  
  export interface LoggerOptions {
    dir: string;
    debug: boolean;
  }
  
  interface Constructor {
    (options: LoggerOptions): LoggerInstance;
  }
  
  export interface BotInstance {
    bot:  Telegraf,
    text: (chatId: string, msg: string)=> void
  }
  
  export const Logger: Constructor;
  export const Bot: (key: string)=> BotInstance
}
