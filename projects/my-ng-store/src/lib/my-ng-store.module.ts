import { NgModule } from '@angular/core';
import { MY_NG_EFFECT } from './my-ng-effect';
import { RoutingEffect } from './routing.effect';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ],
  providers: [
    { provide: MY_NG_EFFECT, useClass: RoutingEffect, multi: true }
  ]
})
export class MyNgStoreModule { }
