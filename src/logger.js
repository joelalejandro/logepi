const winston = require("winston");
const { basename } = require("path");
const { camelize, capitalize } = require("ember-cli-string-utils");

const tagString = (name, value) => `[${name}:${value}]`;
const tagJson = (name, objectOrString) =>
  `[${name}:${
    typeof objectOrString === "object" || Array.isArray(objectOrString)
      ? JSON.stringify(objectOrString)
      : objectOrString
  }]`;
const tagTimestamp = value => tagString("timestamp", value);

const buildLogEntry = info => {
  const tags = [];

  tags.push(tagTimestamp(info.timestamp));
  tags.push(tagString("level", info.level));

  try {
    const stackContainer = {};
    Error.captureStackTrace(stackContainer);
    if (stackContainer.stack) {
      const stackLines = stackContainer.stack.split("\n").reverse();
      const firstStackCall =
        stackLines[
          stackLines.findIndex(stackCall => stackCall.includes("log.js")) - 1
        ];
      tags.push(
        tagString(
          "class",
          capitalize(camelize(basename(firstStackCall).split(".js")[0]))
        )
      );
    }
  } catch (e) {
    if (info.class) {
      tags.push(tagString("class", info.class));
    }
  }

  if (info.message) {
    tags.push(tagString("message", info.message));
  }

  if (info.request) {
    const data = [
      tagString("url", info.request.url),
      tagJson("queryParams", info.request.queryParams),
      tagJson("body", info.request.body),
      tagJson("headers", info.request.headers)
    ];

    tags.push(...data);
  }

  if (info.response) {
    const data = [
      tagString("status", info.response.status),
      tagJson("body", info.response.body),
      tagJson("headers", info.response.headers)
    ];

    tags.push(...data);
  }

  if (info.sql) {
    tags.push(tagString("query", info.sql.query));
  }

  if (info.tags) {
    tags.push(
      ...Object.keys(info.tags).map(tagName =>
        tagString(tagName, info.tags[tagName])
      )
    );
  }

  return tags.join(" ");
};

const consoleTransport = new winston.transports.Console();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => buildLogEntry(info))
  ),
  transports: [consoleTransport]
});

module.exports = class Log {
  static setOutputLevel(logLevel) {
    consoleTransport.level = logLevel;
  }

  static message(logLevel, message, data = {}) {
    logger.log(logLevel, message, data);
  }

  static request(
    logLevel,
    url,
    queryParams,
    body = "",
    headers = {},
    data = {}
  ) {
    Log.message(
      logLevel,
      "IncomingRequest",
      Object.assign(data, {
        request: {
          url,
          queryParams,
          body,
          headers
        }
      })
    );
  }

  static response(logLevel, status, body, headers = {}, data = {}) {
    Log.message(
      logLevel,
      "OutgoingResponse",
      Object.assign(data, { response: { status, body, headers } })
    );
  }

  static error(message, data = {}) {
    Log.message("error", message, data);
  }

  static warn(message, data = {}) {
    Log.message("warn", message, data);
  }

  static info(message, data = {}) {
    Log.message("info", message, data);
  }

  static verbose(message, data = {}) {
    Log.message("verbose", message, data);
  }

  static debug(message, data = {}) {
    Log.message("debug", message, data);
  }
};
