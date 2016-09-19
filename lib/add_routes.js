const STATIC_ROUTE_HANDLER = {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: './public',
      listing: false,
    },
  },
};

// addRoutes :: [Hapi.Route] -> Hapi.Server -> Hapi.Server
const addRoutes = (routes = []) => server => {
  if (!Array.isArray(routes)) throw new TypeError('Invalid route options');
  server.route([STATIC_ROUTE_HANDLER, ...routes]);
  return server;
};

module.exports = addRoutes;
