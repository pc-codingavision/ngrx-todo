import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import TodoState from '../../todo-state';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-track-activity',
  templateUrl: './track-activity.component.html',
  styleUrls: ['./track-activity.component.css']
})
export class TrackActivityComponent implements OnInit {
  store$: Observable<TodoState>;
  activityMessages: string[] = [];

  constructor(private store: Store<{ todos: TodoState }>) {
    this.store$ = this.store.pipe(select('todos'));
  }

  ngOnInit(): void {
    this.store$.pipe(
      map((todoStore: TodoState) => todoStore.trackActivity)
    ).subscribe(message => this.activityMessages.push(message));
  }

  clearLog(): void {
    this.activityMessages = [];
  }
}
