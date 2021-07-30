import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import withObservables from '@nozbe/with-observables';

import {updateTodo} from '../database/helpers';

function Todo({todo}) {
  async function setAsDone() {
    await updateTodo(todo);
  }

  return (
    <View>
      <Text>{todo.task}</Text>
      <TouchableOpacity onPress={setAsDone}>
        <Text>{todo.isDone ? 'done' : 'to do'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const enhanceWithTodo = withObservables(['todo'], ({todo}) => ({
  todo,
}));

export default enhanceWithTodo(Todo);
