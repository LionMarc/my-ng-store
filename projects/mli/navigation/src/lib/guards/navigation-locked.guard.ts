import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take, map } from 'rxjs';

import { MyNgStore } from 'my-ng-store';

import { selectNavigationState } from '../state';

@Injectable({
  providedIn: 'root',
})
export class NavigationLockedGuard implements CanDeactivate<unknown> {
  constructor(private store: MyNgStore) {}

  public canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.state$.pipe(
      take(1),
      map((s) => !selectNavigationState(s).navigationLocked)
    );
  }
}
