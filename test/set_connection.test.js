import test from 'ava';
import { createServer, setConnection } from '../lib';

test('setConnection rejects a Promise when called with invalid data', async t => {
  t.plan(2);
  const server =
    createServer()
    .then(setConnection('invalid configuration data'));

  const err = await t.throws(server);
  t.regex(err.message, /Invalid options value/);
});
