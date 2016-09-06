import test from 'ava';
import { createServer, setConnection, addRoutes } from '../lib';

const handler = (req, reply) => reply('test route works');
const testRoute = { method: 'GET', path: '/test', handler };

test('Errors propagate through promise chain', async t => {
  const server =
    createServer([])
    .then(setConnection())
    .then(addRoutes([testRoute]));

  const err = await t.throws(server);
  t.regex(err.message, /Invalid server options/);
});
