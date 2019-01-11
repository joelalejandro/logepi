import { Context } from "koa";
import { Request, Response, NextFunction } from "express";

type LoggableData = { [key: string]: any };

declare namespace Logepi {
  export enum LogLevel {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    VERBOSE = "verbose",
    DEBUG = "debug"
  }

  export type ResponseLogLevelOptions = {
    status2xx?: LogLevel;
    status4xx?: LogLevel;
    status5xx?: LogLevel;
  };

  export type LogLevelOptions = {
    request?: LogLevel;
    response?: ResponseLogLevelOptions;
  };

  export type LoggingMiddlewareOptions = {
    logLevels?: LogLevelOptions;
  };

  export class Log {
    static setOutputLevel: (logLevel: LogLevel) => void;

    static message: (
      logLevel: LogLevel,
      message: string,
      data: LoggableData
    ) => void;
    static request: (
      logLevel: LogLevel,
      url: string,
      queryParams: LoggableData,
      body: string,
      headers: LoggableData,
      data: LoggableData
    ) => void;
    static response: (
      logLevel: LogLevel,
      status: number,
      body: string,
      headers: LoggableData,
      data: LoggableData
    ) => void;
    static error: (message: string, data: LoggableData) => void;
    static warn: (message: string, data: LoggableData) => void;
    static info: (message: string, data: LoggableData) => void;
    static verbose: (message: string, data: LoggableData) => void;
    static debug: (message: string, data: LoggableData) => void;
  }

  export function ExpressLoggingMiddleware(
    options?: LoggingMiddlewareOptions
  ): (req: Request, res: Response, next: NextFunction) => void;

  export function KoaLoggingMiddleware(
    options?: LoggingMiddlewareOptions
  ): (ctx: Context, next: () => Promise<void>) => Promise<void>;
}

export = Logepi;
