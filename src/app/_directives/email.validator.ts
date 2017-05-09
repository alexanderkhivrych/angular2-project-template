import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

function validateEmailFactory() {
  return (c: FormControl) => {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return (!c.value || (c.value == "") || ((c.value.length >= 5) && EMAIL_REGEXP.test(c.value))) ? null : {
      invalidEmail: true
    };
  };
}

@Directive({
  selector: '[email]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
  ]
})
export class EmailValidator {

  validator: Function;

  constructor() {
    this.validator = validateEmailFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}
