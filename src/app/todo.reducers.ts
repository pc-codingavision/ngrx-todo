import { Action, createReducer, on } from '@ngrx/store';
import TodoState, { initializeState } from './todo-state';
import * as todoActions from './todo.actions';

export const initialState = initializeState();

/**
 * 1. Single source of truth
 * 2. State is read-only
 * 3. Changes are made with pure function
 */
const reducer = createReducer(
  initialState,
  on(todoActions.startGetTodos, state => state),
  on(todoActions.successGetTodo, (state: TodoState, {payload}) => {
    return {...state, todos: payload};
  }),
  on(todoActions.startCreateTodo, (state: TodoState, {payload}) => {
    return {
      ...state,
      todos: [...state.todos],
      todoError: null
    };
  }),
  on(todoActions.successCreateTodo, (state: TodoState, {payload}) => {
    return {...state, todos: [...state.todos, payload], todoError: null};
  }),
  on(todoActions.startToggleTodo, (state: TodoState, {id}) => {
    return {...state};
  }),
  on(todoActions.successToggleTodo, (state: TodoState, {payload}) => {
    return {
      ...state, todos: [...state.todos.map(todo => {
        if (todo.id === payload.id) {
          return payload;
        }
        return todo;
      })], todoError: null
    };
  }),
  on(todoActions.startDeleteTodo, (state: TodoState, {id}) => {
    return {...state, todos: [...state.todos.filter(todo => todo.id !== id)]};
  }),
  on(todoActions.successDeleteTodo, (state: TodoState, {payload}) => {
    return {...state, todos: [...state.todos]};
  }),
  on(todoActions.ErrorTodo, (state: TodoState, error: Error) => {
    return {...state, todoError: error};
  })
);

export function todoReducer(state: TodoState | undefined, action: Action): TodoState {
  return reducer(state, action);
}
