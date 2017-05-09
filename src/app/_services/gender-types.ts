import { Injectable } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

@Injectable()
export class GenderTypes {
  public _all = [];
  public default: any;

  public get all():any {
    return this._all;
  }

  private build(id, code) {
    this._all.push({
      id: id,
      code: code,
      title: this.translation.translate(`gender_type.${code}`)
    })
  }

  constructor(
    private translation: TranslationService
  ) {
    this.build(1, 'man');
    this.build(2, 'woman');
    this.build(3, 'none');
    this.default = this._all[this._all.length - 1];
  }
}
