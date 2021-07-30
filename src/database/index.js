import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import Todo from './todo';

const adapter = new SQLiteAdapter({schema});

export const database = new Database({
  adapter,
  modelClasses: [Todo],
  actionsEnabled: true,
});
