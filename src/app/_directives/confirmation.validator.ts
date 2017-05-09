import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[confirmation]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ConfirmationValidator), multi: true }
  ]
})
export class ConfirmationValidator {
  @Input() confirmation: any = {};
  private oldValue: string;
  private ctrl;

  constructor() {}

  ngDoCheck() {
    if (this.oldValue != this.confirmation.value) {
      this.oldValue = this.confirmation.value;
      if (this.ctrl && (this.ctrl.valid ||
         (this.ctrl.errors && this.ctrl.errors.confirmation != null))) {
        this.ctrl.setErrors(this.validate(this.ctrl));
      }
    }
  }

  validate(ctrl: FormControl) {
    this.ctrl = ctrl;
    let v = ctrl.value;
    let e = this.confirmation;
    if (e && e.value && ((e.value.length > 0) || e.valid) && v !== e.value) return {
      confirmation: false
    }
    return null;
  }
}
