import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';

const appRouting: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodoComponent },
  { path: '**', component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRouting)],
  exports: [ RouterModule ]
})
export class AppRouting {

}
