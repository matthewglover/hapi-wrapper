/* eslint-disable no-param-reassign */

const provisionInjectPromise = server => {
  server.injectPromise = options =>
    new Promise(resolve => server.inject(options, resolve));

  return server;
};

module.exports = provisionInjectPromise;
