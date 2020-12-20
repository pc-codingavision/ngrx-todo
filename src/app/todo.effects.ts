import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import * as todoActions from './todo.actions';
import { catchError, exhaust, exhaustMap, map, mergeMap } from 'rxjs/operators';
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
      exhaustMap(action => this.todoService.add(action.payload).pipe(
        map((todo: Todo) => {
          return todoActions.successCreateTodo({payload: todo});
        }),
        catchError((error: Error) => {
          return of(todoActions.ErrorTodo(error));
        })
      ))
    )
  );

  toggleStatus$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.startToggleTodo),
      exhaustMap(action => this.todoService.toggleStatus(action.id).pipe(
        map((todo: Todo) => {
          return todoActions.successToggleTodo({payload: todo});
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
      exhaustMap(action => {
        return this.todoService.remove(action.id).pipe(
          map((todo: Todo) => {
            return todoActions.successDeleteTodo({payload: todo});
          }),
          catchError((error: Error) => {
            return of(todoActions.ErrorTodo(error));
          })
        );
      })
    )
  );
}
