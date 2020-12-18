import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import TodoState from '../../todo-state';
import { Observable, Subscription } from 'rxjs';
import Todo from '../../model/todo';
import { map } from 'rxjs/operators';

import * as todoActions from '../../todo.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {

  todos$: Observable<TodoState>;
  todoSubscription: Subscription;
  todos: Array<Todo> = [];
  todoError: Error = null;

  title = '';
  isCompleted = false;

  constructor(private store: Store<{ todos: TodoState }>) {
    this.todos$ = this.store.pipe(select('todos'));
  }

  ngOnInit(): void {
    // Subscribe for changes in the todo state slice
    this.todoSubscription = this.todos$.pipe(
      map(todoStore => {
        this.todos = todoStore.todos;
        this.todoError = todoStore.todoError;
      })
    ).subscribe();

    this.store.dispatch(todoActions.startGetTodos());
  }

  addTodo(): void {
    const newTodo = {id: null, title: this.title, isCompleted: this.isCompleted} as Todo;
    this.store.dispatch(todoActions.startCreateTodo({payload: newTodo}));

    this.title = '';
    this.isCompleted = false;
  }

  ngOnDestroy(): void {
    if (this.todoSubscription) {
      this.todoSubscription.unsubscribe();
    }
  }

  delete(id: number): void {
    this.store.dispatch(todoActions.startDeleteTodo({id}));
  }

  addIsCompletedClass(isCompleted: boolean): string {
    return isCompleted ? 'isCompleted' : 'isNotCompleted';
  }
}
