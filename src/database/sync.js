import {synchronize} from '@nozbe/watermelondb/sync';

import {database} from './index';
import config from '../config';

export async function sync() {
  await synchronize({
    database,

    pullChanges: async ({lastPulledAt}) => {
      const response = await fetch(
        `${config.SYNC_API_URL}/pull?lastPulledAt=${lastPulledAt}`,
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }

      const {changes, timestamp} = await response.json();
      return {changes, timestamp};
    },

    pushChanges: async ({changes, lastPulledAt}) => {
      const response = await fetch(
        `${config.SYNC_API_URL}/push?lastPulledAt=${lastPulledAt}`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(changes),
        },
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }
    },
  });
}
