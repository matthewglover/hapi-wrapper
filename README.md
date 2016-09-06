[![Build Status](https://travis-ci.org/matthewglover/hapi-wrapper.svg?branch=master)](https://travis-ci.org/matthewglover/hapi-wrapper) [![Coverage Status](https://coveralls.io/repos/github/matthewglover/hapi-wrapper/badge.svg?branch=master)](https://coveralls.io/github/matthewglover/hapi-wrapper?branch=master)

# Hapi Wrapper

## What
A Promise-based wrapper around Hapi.

## Why

Hapi has a number of hooks for configuring a server, some of which can be asynchronous. Hapi Wrapper provides a series of simple functions which use Promises to allow the different configuration steps to be composed together.

In addition, it includes sensible defaults, such as serving static resources from a public folder using Inert.

## How

The library can be included in a project using `npm install --save git+https://github.com/matthewglover/hapi-wrapper.git`.

This wrapper libraries has been tested with Node 6+.

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
