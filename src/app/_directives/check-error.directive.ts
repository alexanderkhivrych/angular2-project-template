import {
  Directive, AfterContentInit, ElementRef, Input, DoCheck, HostListener,
  QueryList, ViewChildren, ViewChild, ContentChildren
} from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

import { Translation, TranslationService } from 'angular-l10n';
import { DisplayError } from './display-error.directive';

@Directive({
  selector: '[check-error]'
})
export class CheckError implements AfterContentInit, DoCheck {
  @ContentChildren(DisplayError) fields: QueryList<DisplayError>;

  @Input() server: any;
  @Input('check-error') checkError: any;

  private element: any;
  private oldValue: string;
  private focused: boolean = false;
  private _onReset: Function;

  @HostListener('ngSubmit') onSubmit() {
    console.log('ngSubmit');
    if (this.checkError.invalid) {
      for (let key in this.checkError.controls) {
        console.log('check', key);
        let ctrl = this.checkError.controls[key];
        if (ctrl && ctrl.invalid) {
          ctrl.markAsDirty();
          // just break after first field marked
          // remove it if you want mark all
          break;
        }
      }
    }
  }

  private applyError(ctrl, error) {
    let errors = {};
    error = Array.isArray(error) ? error[0] : error;
    errors[error['type'] || 'server'] = { title: error };
    ctrl.setErrors(errors);
    ctrl.markAsDirty();
  }

  ngDoCheck() {
    if (this.checkError && this.checkError.value) {
      let currValue = JSON.stringify(this.checkError.value);
      if (this.oldValue != currValue) {
        if (this.checkError.invalid && (this.checkError.errors == null)) {
          this.fields.forEach(ctrl => {
            if (ctrl.check.errors && ctrl.check.errors['server']) {
              ctrl.check.control.setErrors(null);
              ctrl.check.control.markAsDirty();
            }
          });
        }
        this.oldValue = currValue;
      }
    }
    if (this.server && (this.server != {})) {
      for (let key in this.server) {
        let ctrl = this.checkError.form.get(key);
        if (ctrl) {
          this.applyError(ctrl, this.server[key]);
          delete this.server[key];
        } else {
          this.fields.forEach(ctrl => {
            if (ctrl.check && (ctrl.check.name === key)) {
              this.applyError(ctrl.check.control, this.server[key])
              delete this.server[key];
            } else if (ctrl.acceptError && (ctrl.acceptError.filter(acc => acc === key).length > 0)) {
              this.applyError(ctrl.check.control, this.server[key])
              delete this.server[key];
            }
          });
        }
      }
    }
  }

  onReset() {
    this.fields.forEach(ctrl => {
      ctrl.makeValid();
    });
  }

  ngAfterContentInit() {
    this.element = this.ref.nativeElement;
    const self = this;

    if ('reset' in this.checkError) {
      // patch FormControl.reset method
      const func = this.checkError.reset;
      this.checkError.reset = function(val) {
        func.call(this, val);
        self.onReset();
      };
    }
  }

  constructor(
    private ref: ElementRef
  ) {}
}
