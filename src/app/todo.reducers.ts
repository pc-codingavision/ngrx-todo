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
  on(todoActions.startGetTodos, state => {
    return {...state, trackActivity: 'Start Get Todos...'};
  }),
  on(todoActions.successGetTodo, (state: TodoState, {payload}) => {
    return {...state, todos: payload, trackActivity: 'Todos retrieved successfully.'};
  }),
  on(todoActions.startCreateTodo, (state: TodoState) => {
    return {
      ...state,
      trackActivity: 'Start Todo creation...'
    };
  }),
  on(todoActions.successCreateTodo, (state: TodoState, {payload}) => {
    return {...state, todos: [...state.todos, payload], todoError: null, trackActivity: 'Todo created successfully.'};
  }),
  on(todoActions.startToggleTodo, (state: TodoState) => {
    return {...state, trackActivity: 'Start toggle status...'};
  }),
  on(todoActions.successToggleTodo, (state: TodoState, {payload}) => {
    return {
      ...state, todos: [...state.todos.map(todo => {
        if (todo.id === payload.id) {
          return payload;
        }
        return todo;
      })], todoError: null, trackActivity: 'Todo status toggled successfully.'
    };
  }),
  on(todoActions.startDeleteTodo, (state: TodoState) => {
    return {...state, trackActivity: 'Start todo deletion...'};
  }),
  on(todoActions.successDeleteTodo, (state: TodoState, {payload}) => {
    return {...state, todos: [...state.todos.filter(todo => todo.id !== payload.id)], trackActivity: 'Todo deleted successfully.'};
  }),
  on(todoActions.ErrorTodo, (state: TodoState, error: Error) => {
    return {...state, todoError: error, trackActivity: 'Error occurred.'};
  })
);

export function todoReducer(state: TodoState | undefined, action: Action): TodoState {
  return reducer(state, action);
}
