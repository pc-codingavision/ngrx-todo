import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import * as todoActions from './todo.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { TodoService } from './services/todo-service';
import Todo from './model/todo';

@Injectable()
export class TodoEffects {
  constructor(
    private todoService: TodoService,
    private actions$: Actions
  ) {
  }

  getTodos$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.startGetTodos),
      mergeMap(action => this.todoService.getAll().pipe(
        map((todos: Array<Todo>) => {
          return todoActions.successGetTodo({payload: todos});
        }),
        catchError((error: Error) => {
          return of(todoActions.ErrorTodo(error));
        })
      ))
    )
  );

  createTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.startCreateTodo),
      mergeMap(action => this.todoService.add(action.payload).pipe(
        map((todo: Todo) => {
          return todoActions.successCreateTodo({payload: todo});
        }),
        catchError((error: Error) => {
          return of(todoActions.ErrorTodo(error));
        })
      ))
    )
  );

  removeTodo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.startDeleteTodo),
      mergeMap(action => this.todoService.remove(action.id).pipe(
        map((todo: Todo) => {
          return todoActions.successDeleteTodo({payload: todo});
        }),
        catchError((error: Error) => {
          return of(todoActions.ErrorTodo(error));
        })
      ))
    )
  );
}
