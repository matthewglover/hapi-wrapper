// setConnection :: Object? -> Hapi.Server -> Hapi.Server
const setConnection = options => server => {
  server.connection(options);
  return server;
};

module.exports = setConnection;
