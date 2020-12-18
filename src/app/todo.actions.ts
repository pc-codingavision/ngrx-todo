import { createAction, props } from '@ngrx/store';
import Todo from './model/todo';


export const START_GET_TODOS = '[Todo] Start Get Todos';
export const SUCCESS_GET_TODOS = '[Todo] Success Get Todos';
export const START_CREATE_TODO = '[Todo] Start Create Todo';
export const SUCCESS_CREATE_TODO = '[Todo] Success Create Todo';
export const START_DELETE_TODO = '[Todo] Start Delete Todo';
export const SUCCESS_DELETE_TODO = '[Todo] Start Delete Todo';
export const ERROR_TODO = '[Todo] Error Todo';

export const startGetTodos = createAction(START_GET_TODOS);
export const successGetTodo = createAction(SUCCESS_GET_TODOS, props<{ payload: Array<Todo> }>());
export const startCreateTodo = createAction(START_CREATE_TODO, props<{ payload: Todo }>());
export const successCreateTodo = createAction(SUCCESS_CREATE_TODO, props<{ payload: Todo }>());
export const startDeleteTodo = createAction(START_DELETE_TODO, props<{ id: number}>());
export const successDeleteTodo = createAction(SUCCESS_DELETE_TODO, props<{ payload: Todo}>());
export const ErrorTodo = createAction(ERROR_TODO, props<Error>());
