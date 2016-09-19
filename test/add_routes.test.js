import test from 'ava';
import Hapi from 'hapi';
import { createServer, setConnection, addRoutes } from '../lib';
import provisionInjectPromise from '../test-helpers/provision-inject-promise';

const handler = (req, reply) => reply('test route works');
const testRoute = { method: 'GET', path: '/test', handler };

test('addRoutes doesn\'t throw error if called without routes', async t => {
  const server =
        await createServer()
        .then(setConnection())
        .then(addRoutes());

  t.true(server instanceof Hapi.Server);
});

test('addRoutes takes an array of routes and adds them to server', async t => {
  const server =
        await createServer()
        .then(setConnection())
        .then(addRoutes([testRoute]))
        .then(provisionInjectPromise);

  const reply =
    await server.injectPromise({ method: 'GET', url: '/test' });

  t.regex(reply.result, /test route works/);
});

test('addRoutes rejects a Promise when called with invalid data', async t => {
  t.plan(2);
  const server =
    createServer()
    .then(setConnection())
    .then(addRoutes(''));

  const err = await t.throws(server);
  t.regex(err.message, /Invalid route options/);
});

test('addRoutes rejects a Promise when called without valid connection', async t => {
  t.plan(2);
  const server =
    createServer()
    .then(addRoutes([]));

  const err = await t.throws(server);
  t.regex(err.message, /Cannot add a route without any connections/);
});
