import { createAction, props } from '@ngrx/store';
import Todo from './model/todo';


export const GET_TODOS = '[Todo] Get Todo';
export const START_GET_TODOS = '[Todo] Start Get Todos';
export const SUCCESS_GET_TODOS = '[Todo] Success Get Todos';
export const CREATE_TODO_ACTION = '[Todo] Create Todo';
export const START_CREATE_TODO = '[Todo] Start Create Todo';
export const SUCCESS_CREATE_TODO = '[Todo] Success Create Todo';
export const ERROR_TODO = '[Todo] Error Todo';

export const getTodos = createAction(GET_TODOS);
export const startGetTodo = createAction(START_GET_TODOS);
export const successGetTodo = createAction(SUCCESS_GET_TODOS, props<{ payload: Array<Todo> }>());
export const createTodo = createAction(CREATE_TODO_ACTION, props<Todo>());
export const startCreateTodo = createAction(START_CREATE_TODO, props<{ payload: Todo }>());
export const successCreateTodo = createAction(SUCCESS_CREATE_TODO, props<{ payload: Todo }>());
export const ErrorTodo = createAction(ERROR_TODO, props<Error>());
