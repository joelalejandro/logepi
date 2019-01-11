<img align="left" src="https://i.imgur.com/PTzwjQY.jpg" height="150px" />

<h1 style="margin-left:160px">Logepi</h1>

<h2 style="margin-left:160px">A tiny, Togepi-sized, logging library for Node.js apps & APIs.</h2>

<br clear="left"/>

## How to install

### Using npm

```shell
$ npm install --save logepi
```

### Using yarn

```shell
$ yarn install logepi
```

## How to use

The library is comprised of two major components:

- A `Log` static class which creates an instance of a [Winston](https://github.com/winstonjs/winston) logger, exposing several methods to output messages with different loglevels.
- `Middleware` functions to add automatic logging of request/response flows for HTTP servers. Currently the library supports [Koa](https://koajs.com) and [Express](https://expressjs.com/).

There's also a [TypeScript declaration](./index.d.ts) file available for TS-based apps.

### Using the `Log` API

#### Importing the library

```js
// commonjs style
const { Log } = require("logepi");

// ES modules style
import { Log } from "logepi";
```

#### Log an error

```js
Log.error("An error was found", { tags: { process: "foo" } });
```

#### Log a warning

```js
Log.warning("Careful!", { tags: { process: "foo" } });
```

#### Log at INFO level

```js
Log.info("Hopefully someone will read this.", { tags: { process: "foo" } });
```

#### Log at VERBOSE level

```js
Log.verbose("Now I'm all blah-by.", { tags: { process: "foo" } });
```

#### Log at DEBUG log

```js
Log.debug("I've said too much!", { tags: { process: "foo" } });
```

### Using the Koa middleware

#### Import the library

```js
// commonjs style
const { KoaLoggingMiddleware } = require("logepi");

// ES modules style
import { KoaLoggingMiddleware } from "logepi";
```

#### Inject it into your app

```js
app
    .use(...)
    // ...make sure it's the *last* middleware...
    .use(KoaLoggingMiddleware());
```

### Using the Express middleware

#### Import the library

```js
// commonjs style
const { ExpressLoggingMiddleware } = require("logepi");

// ES modules style
import { ExpressLoggingMiddleware } from "logepi";
```

#### Inject it into your app

```js
app
    .use(...)
    // ...make sure it's the *last* middleware...
    .use(ExpressLoggingMiddleware());
```

### Adding tags to logs

Logepi offers a way to inject tagged data in a logline, with the format `[key:value]`. When logging, use the `tags` key on the `data` argument of any of the Log API methods. There's an example right in the next section.

## How does it look?

_**Note:** Logs are single-lined, but for clarity's sake, they're shown in multiple lines._

### Manual logging

```js
Log.info("API is now ready", { tags: { port } });
```

outputs:

```
[timestamp:2019-01-11T21:04:41.915Z]
[level:info]
[message:API is now ready]
[port:9000]
```

### Incoming request

```
[timestamp:2019-01-11T21:00:45.442Z]
[level:info]
[message:IncomingRequest]
[url:/api/apps]
[queryParams:undefined]
[body:{}]
[headers:{"host":"localhost:9000","connection":"keep-alive","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8","accept-encoding":"gzip, deflate, br","accept-language":"es-ES,es;q=0.9,en;q=0.8,en-US;q=0.7"}]
```

### Outgoing response

```
[timestamp:2019-01-11T21:00:45.446Z]
[level:info]
[message:OutgoingResponse]
[status:200]
[body:{"ok":true,"data":{"foo":true}}]
[headers:{"host":"localhost:9000","connection":"keep-alive","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8","accept-encoding":"gzip, deflate, br","accept-language":"es-ES,es;q=0.9,en;q=0.8,en-US;q=0.7"}]
```

## Issues

Feel free to report any [issues](./issues) and we'll figure out a way to make it work.

## Want to contribute?

That's great! Open an issue first and let's discuss what you want to add or, by all means, fork this project! :)

## License

This project is licensed under the [MIT License](./LICENSE).
