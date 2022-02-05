import { Component, OnDestroy } from '@angular/core';
import { distinctUntilChanged, map, Observable, Subject, takeUntil } from 'rxjs';

import { MyNgAction } from './my-ng-action';
import { MyNgState } from './my-ng-state';
import { MyNgStore } from './my-ng-store';

@Component({
  template: ''
})
export class MyNgStoreComponent implements OnDestroy {
  private readonly _unsubscribeAll$ = new Subject<void>();

  constructor(protected store: MyNgStore) {

  }

  protected get unsubscribeAll$(): Observable<void> {
    return this._unsubscribeAll$.asObservable();
  }

  public ngOnDestroy(): void {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }

  public watch<T>(selector: (state: MyNgState) => T): Observable<T> {
    return this.store.state$
      .pipe(
        map(state => selector(state)),
        distinctUntilChanged(),
        takeUntil(this.unsubscribeAll$)
      );
  }

  public dispatchAction(action: MyNgAction): void {
    this.store.dispatchAction(action);
  }

  public dispatchActionType(actionType: string): void {
    this.dispatchAction({
      type: actionType
    });
  }
}
