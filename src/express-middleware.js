const Log = require("./logger");

module.exports = function ExpressLoggingMiddleware() {
  return (req, res, next) => {
    Log.request(
      "info",
      req.url,
      req.params,
      JSON.stringify(req.body),
      req.headers
    );
    next();
    Log.response("info", res.status, res.body, res.headers);
  };
};
