import { InjectionToken } from '@angular/core';
import { MyNgAction } from './my-ng-action';
import { MyNgState } from './my-ng-state';

export interface MyNgReducer {
    readonly actionTypes: string[];

    update(state: MyNgState, action: MyNgAction): MyNgState;
}

export const MY_NG_REDUCER = new InjectionToken<MyNgReducer>('MY_NG_REDUCER');
