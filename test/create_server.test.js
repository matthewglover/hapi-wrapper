import test from 'ava';
import Hapi from 'hapi';
import { createServer, setConnection, addRoutes } from '../lib';
import provisionInjectPromise from '../test-helpers/provision-inject-promise';

test('createServer returns a Promise resolving to a server instance', async t => {
  const server = await createServer();
  t.true(server instanceof Hapi.Server);
});

test('createServer rejects a Promise when called with invalid data', async t => {
  t.plan(2);
  const err = await t.throws(createServer('invalid configuration data'));
  t.regex(err.message, /Invalid server options/);
});

test('createServer and addRoutes sets up Inert to serve files from ./public folder', async t => {
  const server =
    await createServer()
    .then(setConnection())
    .then(addRoutes())
    .then(provisionInjectPromise);

  const reply =
    await server.injectPromise({ method: 'GET', url: '/test.txt' });

  t.regex(reply.result, /Hello Hapi World!/);
});

// eslint-disable-next-line max-len
test('createServer and addRoutes (with custom path of /public/{param*}) sets up Inert to serve files from ./public folder at /public', async t => {
  const server =
    await createServer()
    .then(setConnection())
    .then(addRoutes(undefined, { path: '/public/{param*}' }))
    .then(provisionInjectPromise);

  const reply =
    await server.injectPromise({ method: 'GET', url: '/public/test.txt' });

  t.regex(reply.result, /Hello Hapi World!/);
});

test(`createServer and addRoutes can be setup to prevent Inert from serving
      any static files with options { setStaticRoutes: false }`, async t => {
  const server =
    await createServer()
    .then(setConnection())
    .then(addRoutes(undefined, { setStaticRoutes: false }))
    .then(provisionInjectPromise);

  const reply =
    await server.injectPromise({ method: 'GET', url: '/test.txt' });

  t.is(reply.result.statusCode, 404);
});
