import Todo from './model/todo';
import { TODOS_MOCK } from './model/mock-todo-data';

export default class TodoState {
  todos: Array<Todo>;
  todoError: Error;
}

export const initializeState = (): TodoState => {
  return {todos: TODOS_MOCK, todoError: null};
};
