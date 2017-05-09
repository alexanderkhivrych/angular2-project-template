import { Directive, AfterContentInit, ElementRef, Input, DoCheck, HostListener } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

import { Translation, TranslationService } from 'angular-l10n';

@Directive({
  selector: '[display-error]',
  providers: []
})
export class DisplayError {
  @Input() check: any = null;
  @Input() immediate: string;
  @Input('accept-error') rawAcceptError: string;
  acceptError: Array<string> = [];
  form: NgForm;
  element: any;
  private errorReg = /error/i;
  private validReg = /valid/i;
  private notFocusedReg = /not-focused/i;
  private errorDOM;

  private focused: boolean = false;

  // localized errors can be specified in form & model scopes
  // sample: errors.registration.email.required
  // sample: errors.email.required
  // sample: errors.required
  private errorMessage(): string {
    let error;
    if (this.check.errors) {
      let keys = Object.getOwnPropertyNames(this.check.errors)
      for (let key in this.check.errors) {
        if (this.check.errors[key]['title'] != null) {
          error = this.check.errors[key]['title']
          continue
        }
        if (!error && this.check) {
          if (this.form) {
            error = this.translation.translate(`errors.${this.form.name}.${this.check.name}.${key}`)
          }
          error = error || this.translation.translate(`errors.${this.check.name}.${key}`)
        }
        error = error || this.translation.translate(`errors.${key}`)
        if (error && error.length > 0) break;
      }
    }
    return error || ''
  }

  private errorAvailable(): boolean {
    return this.check.invalid && (this.check.touched || this.check.dirty);
  }

  private setErrorMessage(msg: string) {
    if (this.errorDOM == null) {
      this.errorDOM = document.createElement('span');
    }
    this.errorDOM.innerHTML = msg;
    this.element && this.element.appendChild(this.errorDOM);
  }

  makeInvalid() {
    this.element && this.element.classList.add('field_error');
    this.setErrorMessage(this.errorMessage());
  }

  makeValid() {
    this.element && this.element.classList.remove('field_error');
    this.errorDOM && this.errorDOM.remove();
  }

  @HostListener('focusin')
  onFocus() {
    this.focused = true;
  }

  @HostListener('focusout')
  onFocusOut() {
    this.focused = false;

    if (this.errorAvailable()) {
      this.makeInvalid();
    } else {
      this.makeValid();
    }
  }

  private immediateError(): boolean {
    if (this.immediate) {
      if (this.errorReg.test(this.immediate)) {
        return true;
      }
    }
    return false;
  }

  private immediateValid(): boolean {
    if (this.immediate) {
      if (this.validReg.test(this.immediate)) {
        return true;
      }
    }
    return false;
  }

  ngDoCheck() {
    if (this.errorAvailable()) {
      if (this.immediateError()) {
        this.makeInvalid();
      }
    } else {
      if (this.immediateValid()) {
        this.makeValid();
      }
    }

    if (this.check && this.check.dirty && !this.focused) {
      if (this.errorAvailable()) {
        this.makeInvalid();
      } else {
        this.makeValid();
      }
    }
  }

  ngAfterContentInit() {
    this.element = this.ref.nativeElement;
    this.form = this.check && this.check.formDirective;
    if (this.rawAcceptError && this.rawAcceptError.length > 0) {
      this.acceptError = this.rawAcceptError.split(/[,\s]+/).map(t => t.trim() )
    }
  }

  constructor(
    private ref: ElementRef,
    public translation: TranslationService
  ) {}
}
