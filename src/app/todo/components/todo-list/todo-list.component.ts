import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { MyNgStoreComponent, MyNgStore } from 'my-ng-store';

import { Todo } from '../../model';
import { selectTodoState } from '../../state';
import { TodoActionType } from '../../actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent extends MyNgStoreComponent {

  constructor(store: MyNgStore) {
    super(store);
  }

  public get todoList$(): Observable<Todo[]> {
    return this.watch(s => selectTodoState(s).todoList);
  }

  public addTodo(): void {
    this.dispatchActionType(TodoActionType.addTodo);
  }

}
