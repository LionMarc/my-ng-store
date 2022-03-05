import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteTestingComponent } from './components/route-testing/route-testing.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

const routes: Routes = [
  {
    path: 'todos',
    children: [
      {
        path: '',
        component: TodoListComponent
      },
      {
        path: 'testing',
        component: RouteTestingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
