// addRoutes :: [Hapi.Route] -> Hapi.Server -> Hapi.Server
const addRoutes = (routes = []) => server => {
  server.route(routes);
  return server;
};

module.exports = addRoutes;
