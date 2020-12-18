import Todo from './model/todo';

export default class TodoState {
  todos: Array<Todo>;
  todoError: Error;
}

export const initializeState = (): TodoState => {
  return {todos: [], todoError: null};
};
