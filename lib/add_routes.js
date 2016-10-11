const { pickAll } = require('ramda');

const DEFAULT_OPTIONS = {
  setStaticRoutes: true,
  path: '/{param*}',
  handler: {
    directory: {
      path: './public',
      listing: false,
    },
  },
};


const getRouteConfig =
  pickAll(['path', 'handler']);

const createStaticRouteHandler = (options) =>
  (options.setStaticRoutes
    ? [Object.assign({ method: 'GET' }, getRouteConfig(options))]
    : []);

// addRoutes :: ([Hapi.Route], Object) -> Hapi.Server -> Hapi.Server
const addRoutes = (routes = [], userOptions = {}) => server => {
  if (!Array.isArray(routes)) throw new TypeError('Invalid route options');

  const options = Object.assign({}, DEFAULT_OPTIONS, userOptions);

  server.route(createStaticRouteHandler(options).concat(routes));

  return server;
};

module.exports = addRoutes;
