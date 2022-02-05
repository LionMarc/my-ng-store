import { InjectionToken } from '@angular/core';
import { MyNgAction } from './my-ng-action';
import { MyNgState } from './my-ng-state';
import { MyNgStore } from './my-ng-store';

export interface MyNgEffect {
    readonly actionTypes: string[];

    process(store: MyNgStore, state: MyNgState, action: MyNgAction): void;
}

export const MY_NG_EFFECT = new InjectionToken<MyNgEffect>('MY_NG_EFFECT');
