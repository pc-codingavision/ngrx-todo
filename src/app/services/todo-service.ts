import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import Todo from '../model/todo';

import * as _ from 'lodash';
import { select, Store } from '@ngrx/store';
import TodoState from '../todo-state';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: Todo[];

  constructor(private store: Store<{ todos: TodoState }>) {
    this.store.pipe(select('todos')).subscribe(state => this.todos = state.todos);
  }

  getAll(): Observable<Array<Todo>> {
    return of(this.todos);
  }

  add(todo: Todo): Observable<Todo> {
    const newTodo = Object.assign({}, {...todo}, {id: (_.max(this.todos.map(t => t.id)) || 0) + 1});
    this.todos = [...this.todos, newTodo];

    return of(newTodo);
  }

  toggleStatus(id: number): Observable<Todo> {
    const t = Object.assign({}, this.todos.find(todo => todo.id === id));
    t.isCompleted = !t.isCompleted;

    return of(t);
  }

  remove(id: number): Observable<Todo> {
    const todoToRemove = _.find(this.todos, todo => todo.id === id);
    if (todoToRemove) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      return of(todoToRemove);
    }
    return EMPTY;
  }
}
