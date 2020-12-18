import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import Todo from '../model/todo';
import { TODOS_MOCK } from '../model/mock-todo-data';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos = [...TODOS_MOCK];

  constructor() {
  }

  getAll(): Observable<Array<Todo>> {
    return of(this.todos);
  }

  add(todo: Todo): Observable<Todo> {
    debugger
    const newTodo = Object.assign({}, {...todo}, {id: (_.max(this.todos.map(t => t.id)) || 0) + 1 });
    this.todos = [...this.todos, newTodo];

    return of(newTodo);
  }

  remove(id: number): Observable<Todo> {
    debugger
    const todoToRemove = _.find(this.todos, todo => todo.id === id);
    if (todoToRemove) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      return of(todoToRemove);
    }
    return EMPTY;
  }
}
