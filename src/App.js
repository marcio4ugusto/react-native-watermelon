import React, {useState} from 'react';
import {
  View,
  Button,
  SafeAreaView,
  TextInput,
  StatusBar,
  ScrollView,
} from 'react-native';
import withObservables from '@nozbe/with-observables';

// import Syncronize from './components/syncronize';
import Todo from './components/todo';

import {saveTodo, observeTodos} from './database/helpers';

function App({todos}) {
  const [task, setTask] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    setIsSaving(true);

    await saveTodo({task});

    setTask('');
    setIsSaving(false);
  }

  return (
    <>
      <StatusBar />
      <SafeAreaView>
        {/* <Syncronize /> */}
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <TextInput
              placeholder="Todo"
              onChangeText={val => setTask(val)}
              value={task}
            />
            <Button title="Add" disabled={isSaving} onPress={handleSave} />
          </View>
          {todos.map(t => (
            <Todo key={t.id} todo={t} />
          ))}
          <View />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const enhanceWithTodos = withObservables([], () => ({
  todos: observeTodos(),
}));

export default enhanceWithTodos(App);
