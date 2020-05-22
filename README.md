# deno-cors

A fork of expressjs/cors but for deno, deno-express middleware that can be used to enable [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) with various options.

## Import

import cors from "https://raw.githubusercontent.com/nandub/deno-cors/master/lib//mod.ts";

## Usage

### Simple Usage (Enable *All* CORS Requests)

```typescript
import { App } from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";
import cors from "https://raw.githubusercontent.com/nandub/deno-cors/master/lib/mod.ts";
var app = new App();

app.use(cors());

app.get('/products/:id', async (req, res) => {
  await res.json({msg: 'This is CORS-enabled for all origins!'})
});

const server = await app.listen(3000);
console.log("app listening on port " + server.port);
```

### Configuring CORS

```typescript
import { App } from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";
import cors from "https://raw.githubusercontent.com/nandub/deno-cors/master/lib/mod.ts";
var app = new App();

var corsOptions = {
   origin: 'http://example.com',
   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.get('/products/:id', async (req, res) => {
  await res.json({msg: 'This is CORS-enabled for all origins!'})
});

const server = await app.listen(3000);
console.log("app listening on port " + server.port);
```

## Configuration Options

* `origin`: Configures the **Access-Control-Allow-Origin** CORS header. Possible values:
  - `Boolean` - set `origin` to `true` to reflect the [request origin](http://tools.ietf.org/html/draft-abarth-origin-09), as defined by `req.header('Origin')`, or set it to `false` to disable CORS.
  - `String` - set `origin` to a specific origin. For example if you set it to `"http://example.com"` only requests from "http://example.com" will be allowed.
  - `RegExp` - set `origin` to a regular expression pattern which will be used to test the request origin. If it's a match, the request origin will be reflected. For example the pattern `/example\.com$/` will reflect any request that is coming from an origin ending with "example.com".
  - `Array` - set `origin` to an array of valid origins. Each origin can be a `String` or a `RegExp`. For example `["http://example1.com", /\.example2\.com$/]` will accept any request from "http://example1.com" or from a subdomain of "example2.com".
  - `Function` - set `origin` to a function implementing some custom logic. The function takes the request origin as the first parameter and a callback (called as `callback(err, origin)`, where `origin` is a non-function value of the `origin` option) as the second.
* `methods`: Configures the **Access-Control-Allow-Methods** CORS header. Expects a comma-delimited string (ex: 'GET,PUT,POST') or an array (ex: `['GET', 'PUT', 'POST']`).
* `allowedHeaders`: Configures the **Access-Control-Allow-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Type,Authorization') or an array (ex: `['Content-Type', 'Authorization']`). If not specified, defaults to reflecting the headers specified in the request's **Access-Control-Request-Headers** header.
* `exposedHeaders`: Configures the **Access-Control-Expose-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Range,X-Content-Range') or an array (ex: `['Content-Range', 'X-Content-Range']`). If not specified, no custom headers are exposed.
* `credentials`: Configures the **Access-Control-Allow-Credentials** CORS header. Set to `true` to pass the header, otherwise it is omitted.
* `maxAge`: Configures the **Access-Control-Max-Age** CORS header. Set to an integer to pass the header, otherwise it is omitted.
* `preflightContinue`: Pass the CORS preflight response to the next handler.
* `optionsSuccessStatus`: Provides a status code to use for successful `OPTIONS` requests, since some legacy browsers (IE11, various SmartTVs) choke on `204`.

The default configuration is the equivalent of:

```json
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
```

For details on the effect of each CORS header, read [this](http://www.html5rocks.com/en/tutorials/cors/) article on HTML5 Rocks.

## Example

server.ts File

```
import * as expressive from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";
import cors from "https://raw.githubusercontent.com/nandub/deno-cors/master/lib/mod.ts";

(async () => {
  const port = 3000;
  const app = new expressive.App();
  app.use(expressive.simpleLog());
  app.use(expressive.static_("./public"));
  app.use(expressive.bodyParser.json());
  app.use(cors());
  app.get("/api/todos", async (req, res) => {
    await res.json([{ name: "Buy some milk" }]);
  });
  // route with dynamic parameter
  app.get("/api/user/{user_id}", async (req, res) => {
    await res.json([{ id: req.params.user_id, name: "Jim Doe", phone: "12425323" }]);
  });
  const server = await app.listen(port);
  console.log("app listening on port " + server.port);
})();
```

## Start app

`deno run --allow-net --allow-read server.ts`

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Author

Nodejs CORS
[Troy Goode](https://github.com/TroyGoode) ([troygoode@gmail.com](mailto:troygoode@gmail.com))

Deno CORS, works with deno-express
[Fernando Ortiz](https://github.com/nandub) ([nandub@nandub.info](mailto:nandub@nandub.info))
