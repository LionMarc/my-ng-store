import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { MyNgStoreComponent, MyNgStore } from 'my-ng-store';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent extends MyNgStoreComponent {
  public readonly formGroup: UntypedFormGroup = new UntypedFormGroup({});

  constructor(store: MyNgStore) {
    super(store);

    this.formGroup.addControl(
      'title',
      new UntypedFormControl(undefined, Validators.required)
    );
  }

}
