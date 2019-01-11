import { Context as KoaContext } from "@types/koa";
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction
} from "@types/express";

declare enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  VERBOSE = "verbose",
  DEBUG = "debug"
}

export = Log;
export type LoggableData = { [key: string]: any };

declare class Log {
  static message(logLevel: LogLevel, message: string, data: LoggableData): void;
  static request(
    logLevel: LogLevel,
    url: string,
    queryParams: LoggableData,
    body: string,
    headers: LoggableData,
    data: LoggableData
  ): void;
  static response(
    logLevel: LogLevel,
    status: number,
    body: string,
    headers: LoggableData,
    data: LoggableData
  ): void;
  static error(message: string, data: LoggableData): void;
  static warn(message: string, data: LoggableData): void;
  static info(message: string, data: LoggableData): void;
  static verbose(message: string, data: LoggableData): void;
  static debug(message: string, data: LoggableData): void;
}

declare function ExpressLoggingMiddleware(): (
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNextFunction
) => void;

declare function KoaLoggingMiddleware(): (
  ctx: KoaContext,
  next: () => Promise<void>
) => Promise<void>;
