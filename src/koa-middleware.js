import Log from "./logger";

export default function KoaLoggingMiddleware() {
  return async (ctx, next) => {
    Log.request(
      "info",
      ctx.request.url,
      ctx.request.params,
      JSON.stringify(ctx.request.body),
      ctx.request.headers
    );
    next();
    Log.response("info", ctx.status, ctx.body, ctx.headers);
  };
}
