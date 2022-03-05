import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { todoListReducerProvider } from './reducers/todo-list.reducer';
import { todoCreationEffectProvider } from './effects/todo-creation.effect';
import { TodoComponent } from './components/todo/todo.component';
import { MyNgStoreModule } from 'my-ng-store';
import { RouteTestingComponent } from './components/route-testing/route-testing.component';
import { testingRouteProvider } from './navigation/testing.route';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoComponent,
    RouteTestingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MyNgStoreModule,
    TodoRoutingModule
  ],
  providers: [
    todoListReducerProvider,
    todoCreationEffectProvider,
    testingRouteProvider
  ]
})
export class TodoModule { }
