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

export const LoggerConstructor: Constructor;
export = LoggerConstructor;
