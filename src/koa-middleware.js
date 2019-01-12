const Log = require("./logger");
const { defaultMiddlewareSettings, getLogLevelForStatus } = require("./utils");
const _ = require("lodash");

module.exports = function KoaLoggingMiddleware(settings = {}) {
  const options = _.merge({ ...defaultMiddlewareSettings }, settings);
  return async (ctx, next) => {
    Log.request(
      options.logLevels.request,
      ctx.request.url,
      ctx.request.params,
      JSON.stringify(ctx.request.body),
      ctx.request.headers
    );
    next();

    Log.response(
      getLogLevelForStatus(ctx.status, options.logLevels.response),
      ctx.status,
      ctx.body,
      ctx.headers
    );
  };
};
