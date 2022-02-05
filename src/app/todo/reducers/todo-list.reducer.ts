import { Injectable, Provider } from '@angular/core';

import { MyNgReducer, MyNgState, MyNgAction, MY_NG_REDUCER } from 'my-ng-store';
import { StoreTodoAction, TodoActionType } from '../actions';
import { updateTodoState } from '../state';

@Injectable()
export class TodoListReducer implements MyNgReducer {
  public readonly actionTypes: string[] = [
    TodoActionType.storeTodo
  ];

  public update(state: MyNgState, action: MyNgAction): MyNgState {
    switch (action.type) {
      case TodoActionType.storeTodo:
        const storeTodoAction = action as StoreTodoAction;
        return updateTodoState(
          state,
          {
            todoList: { $push: [storeTodoAction.todo] }
          }
        );
    }

    return state;
  }
}

export const todoListReducerProvider: Provider = {
  provide: MY_NG_REDUCER,
  useClass: TodoListReducer,
  multi: true
}; 
