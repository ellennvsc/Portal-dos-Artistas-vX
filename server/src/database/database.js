import { resolve } from 'node:path';
import {Database} from 'sqlite-async';

const dbFile = resolve( 'database', 'db.sqlite');

async function connect() {
  const db = await Database.open(dbFile);
  return db;
}

export default { connect };