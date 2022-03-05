import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MyNgStore, MyNgStoreComponent } from 'my-ng-store';
import { TodoActionType } from './todo/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends MyNgStoreComponent {
  constructor(store: MyNgStore) {
    super(store)
  }

  public testRouteingEffect(): void {
    this.dispatchActionType(TodoActionType.goToTesting);
  }
}
