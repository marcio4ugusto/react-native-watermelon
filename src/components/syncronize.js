import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import {sync} from '../database/sync';

function Syncronize() {
  const [syncState, setSyncState] = useState('Syncing...');

  useEffect(() => {
    sync()
      .then(() => setSyncState(''))
      .catch(e => setSyncState('Sync failed!'));
  }, []);

  if (!syncState) {
    return null;
  }

  return (
    <View>
      <Text>{syncState}</Text>
    </View>
  );
}

export default Syncronize;
