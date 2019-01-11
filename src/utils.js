const utils = {};

utils.defaultMiddlewareSettings = {
  logLevels: {
    request: "info",
    response: {
      status2xx: "info",
      status4xx: "warn",
      status5xx: "error"
    }
  }
};

utils.getLogLevelForStatus = function(
  status,
  responseLogLevels = utils.defaultMiddlewareSettings.logLevels.response
) {
  let responseLogLevel = responseLogLevels.status2xx;

  if (status >= 400 && status < 500) {
    responseLogLevel = responseLogLevels.status4xx;
  } else if (status >= 500) {
    responseLogLevel = responseLogLevels.status5xx;
  }

  return responseLogLevel;
};

module.exports = utils;
