import { Context } from "koa";
import { Request, Response, NextFunction } from "express";

declare enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  VERBOSE = "verbose",
  DEBUG = "debug"
}

type LoggableData = { [key: string]: any };

export default class Log {
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

export function ExpressLoggingMiddleware(): (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export function KoaLoggingMiddleware(): (
  ctx: Context,
  next: () => Promise<void>
) => Promise<void>;
