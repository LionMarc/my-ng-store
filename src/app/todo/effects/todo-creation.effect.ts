import { Injectable, Provider } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MyNgEffect, MyNgStore, MyNgState, MyNgAction, MY_NG_EFFECT } from 'my-ng-store';
import { StoreTodoAction, TodoActionType } from '../actions';
import { TodoComponent } from '../components/todo/todo.component';

@Injectable()
export class TodoCreationEffect implements MyNgEffect {
  constructor(private matDialog: MatDialog) {

  }

  public readonly actionTypes: string[] = [
    TodoActionType.addTodo
  ];

  public process(store: MyNgStore, state: MyNgState, action: MyNgAction): void {
    switch (action.type) {
      case TodoActionType.addTodo:
        const dialogRef = this.matDialog.open(
          TodoComponent,
          {
            disableClose: true
          }
        );

        dialogRef.afterClosed().subscribe(value => {
          if (value !== undefined) {
            store.dispatchAction(new StoreTodoAction(value));
          }
        });
    }
  }
}

export const todoCreationEffectProvider: Provider = {
  provide: MY_NG_EFFECT,
  useClass: TodoCreationEffect,
  multi: true
}; 
