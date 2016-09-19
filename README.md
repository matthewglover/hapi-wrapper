[![Build Status](https://travis-ci.org/matthewglover/hapi-wrapper.svg?branch=master)](https://travis-ci.org/matthewglover/hapi-wrapper) [![Coverage Status](https://coveralls.io/repos/github/matthewglover/hapi-wrapper/badge.svg?branch=master)](https://coveralls.io/github/matthewglover/hapi-wrapper?branch=master)

# Hapi Wrapper

## What
A Promise-based wrapper around Hapi.

## Why

Hapi has a number of hooks for configuring a server, some of which can be asynchronous. Hapi Wrapper uses Promises and simple functions which allow the different configuration steps to be composed together.

Hapi-Wrapper also includes Inert by default when you add plugins, with routes configured to serve static resources from the `./public` folder.

## How

To include in your project run:

`npm install --save @matthewglover/hapi-wrapper`.

To create a server:

```javascript
const hapiWrapper = require('hapi-wrapper');

const port = process.env.PORT || 4000;
const connectionOptions = { port };
const plugins = [];
const routes = [];

hapiWrapper.createServer()
  .then(hapiWrapper.setConnection(connectionOptions))
  .then(hapiWrapper.registerPlugins(plugins))
  .then(hapiWrapper.addRoutes(routes))
  .then(hapiWrapper.startServer)
  .then(server => console.log(`Server running at: ${server.info.uri}`))
  .catch(err => console.log(err));
```
