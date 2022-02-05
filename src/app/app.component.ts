import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MyNgStore, MyNgStoreComponent } from 'my-ng-store';

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
}
