import {v4 as uuid} from 'uuid';
import {database} from './index';

export const todos = database.collections.get('todos');

export async function saveTodo(data) {
  await database.action(async () => {
    await todos.create(todo => {
      todo._raw.id = uuid();
      todo.task = data.task;
      todo.isDone = false;
    });
  });
}

export async function updateTodo(todo) {
  await database.action(async () => {
    await todo.update(currentData => {
      currentData.isDone = !currentData.isDone;
    });
  });
}

export const observeTodos = () => todos.query().observe();
