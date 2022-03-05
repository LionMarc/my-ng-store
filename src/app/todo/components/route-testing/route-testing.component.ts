import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MyNgStoreComponent, MyNgStore } from 'my-ng-store';

@Component({
  selector: 'app-route-testing',
  templateUrl: './route-testing.component.html',
  styleUrls: ['./route-testing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteTestingComponent extends MyNgStoreComponent {

  constructor(store:MyNgStore) { 
    super(store);
  }

}
