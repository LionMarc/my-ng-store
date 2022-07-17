import { Inject, Injectable, Optional, Provider } from '@angular/core';

import { MyNgReducer, MyNgState, MyNgAction, MY_NG_REDUCER } from 'my-ng-store';

import { NavigationActionType } from '../actions';
import { NavigationLockingConfig, NAVIGATION_LOCKING_CONFIG } from '../model';
import { updateNavigationState } from '../state';

@Injectable()
export class NavigationReducer implements MyNgReducer {
  private readonly lockingActions: Set<string>;
  private readonly unlockingActions: Set<string>;

  constructor(
    @Inject(NAVIGATION_LOCKING_CONFIG)
    @Optional()
    configs: NavigationLockingConfig[]
  ) {
    this.lockingActions = new Set<string>([
      NavigationActionType.lockNavigation,
    ]);
    this.unlockingActions = new Set<string>([
      NavigationActionType.unLockNavigation,
    ]);

    (configs ?? []).forEach((config) => {
      (config.actionsLockingNavigation ?? []).forEach((action) =>
        this.lockingActions.add(action)
      );
      (config.actionsUnLockingNavigation ?? []).forEach((action) =>
        this.unlockingActions.add(action)
      );
    });

    this.actionTypes = [...this.lockingActions, ...this.unlockingActions];
  }

  public readonly actionTypes: string[];

  public update(state: MyNgState, action: MyNgAction): MyNgState {
    if (this.lockingActions.has(action.type)) {
      return updateNavigationState(state, {
        navigationLocked: { $set: true },
      });
    }

    if (this.unlockingActions.has(action.type)) {
      return updateNavigationState(state, {
        navigationLocked: { $set: false },
      });
    }

    return state;
  }
}

export const navigationReducerProvider: Provider = {
  provide: MY_NG_REDUCER,
  useClass: NavigationReducer,
  multi: true,
};
