const Log = require("./logger");
const { defaultMiddlewareSettings, getLogLevelForStatus } = require("./utils");
const _ = require("lodash");

module.exports = function ExpressLoggingMiddleware(settings = {}) {
  const options = _.merge({ ...defaultMiddlewareSettings }, settings);
  return (req, res, next) => {
    Log.request(
      logLevel,
      req.url,
      req.params,
      JSON.stringify(req.body),
      req.headers
    );
    next();
    Log.response(
      getLogLevelForStatus(res.status, options.logLevels.response),
      res.status,
      res.body,
      res.headers
    );
  };
};
