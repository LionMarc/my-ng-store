import { MyNgAction } from 'my-ng-store';

import { Todo } from '../model';
import { TodoActionType } from './todo-action-type';

export class StoreTodoAction implements MyNgAction {
  public readonly type: string = TodoActionType.storeTodo;

  constructor(public readonly todo: Todo) {

  }
}
