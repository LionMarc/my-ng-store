import { InjectionToken } from '@angular/core';
import { MyNgAction } from './my-ng-action';
import { MyNgState } from './my-ng-state';

export interface MyNgRoute {
    actionType: string;
    getUrl(state: MyNgState, action: MyNgAction): string;
}

export const MY_NG_ROUTE = new InjectionToken<MyNgRoute>('MY_NG_ROUTE');
