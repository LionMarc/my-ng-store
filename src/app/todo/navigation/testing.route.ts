import { Injectable, Provider } from '@angular/core';

import { MyNgRoute, MyNgState, MyNgAction, MY_NG_ROUTE } from 'my-ng-store';
import { TodoActionType } from '../actions';

@Injectable()
export class TestingRoute implements MyNgRoute {
  public readonly actionType:string = TodoActionType.goToTesting;

  public getUrl(state: MyNgState, action: MyNgAction): string {
    return '/todos/testing';
  }
}

export const testingRouteProvider: Provider = {
  provide: MY_NG_ROUTE,
  useClass: TestingRoute,
  multi: true
}; 
