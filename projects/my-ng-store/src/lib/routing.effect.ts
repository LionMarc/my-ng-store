import { Inject, Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MyNgAction } from './my-ng-action';
import { MyNgEffect } from './my-ng-effect';
import { MyNgRoute, MY_NG_ROUTE } from './my-ng-route';
import { MyNgState } from './my-ng-state';
import { MyNgStore } from './my-ng-store';

@Injectable()
export class RoutingEffect implements MyNgEffect {
    constructor(private router: Router, @Inject(MY_NG_ROUTE) @Optional() private routes: MyNgRoute[]) {
        this.actionTypes = (this.routes ?? []).map(r => r.actionType);
    }

    public actionTypes: string[];

    public process(store: MyNgStore, state: MyNgState, action: MyNgAction): void {
        const route = (this.routes ?? []).find(r => r.actionType === action.type);
        if (route){
            const url = route.getUrl(state, action);
            this.router.navigateByUrl(url);
        }
    }
}
