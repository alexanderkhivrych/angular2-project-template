import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'sign-up-password-rate',
  template: `
    <div *ngIf="show" [class]="'container ' + classByType(rate_type)">
      <p>Вимоги до паролю:</p>
      <ul>
        <li>6 і більше символів</li>
        <li>Прописні і рядкові букви</li>
        <li>Використовуйте цифри</li>
      </ul>
      <p [ngSwitch]="rate_type">
        Надійність паролю:
        <b *ngSwitchCase="0">Занадто простий</b>
        <b *ngSwitchCase="1">Слабкий</b>
        <b *ngSwitchCase="2">Нормальний</b>
        <b *ngSwitchCase="3">Сильний</b>
      </p>
      <span class="progress">
        <span class="line" [style.width]="progress * 100 + '%'"></span>
      </span>
    </div>
  `,
  styles: [`
    :host {
      position: relative;
      float: right;
      width: 230px;
    }
    .container {
      position: absolute;
      background: #fff;
      border: 1px solid #ccd7da;
      border-radius: 5px;
      width: 100%;
      padding: 5px;
    }
    .progress {
      width: 100%;
      display: inline-block;
    }
    .progress .line {
      background: #0f0;
      height: 10px;
      display: inline-block;
    }
    .yellow .progress .line { background-color: yellow; }
    .red .progress .line { background-color: red; }
    .orange .progress .line { background-color: orange; }
    .yellow .progress .line { background-color: yellow; }
  `]
})
export class PasswordRateComponent implements OnInit, OnChanges {
  @Input() password: string;
  @Input() show: boolean = false;
  public rate: number = 0;
  public valid: boolean = false;
  public progress: number = 0;
  public rate_type: number = 0;

  constructor() { }

  countRate(value) {
    if ((value == undefined) || (value.length <= 1)) return 0;
    let curr = 0;
    curr += value.length;
    if (/\d/.test(value)) curr += 1;
    if (/[a-z]/.test(value)) curr += 1;
    if (/[A-Z]/.test(value)) curr += 1;
    if (/[^a-zA-Z\d]/.test(value)) curr += 2;
    if (value.length >= 6) curr += 6;
    // 0-9 - invalid ( less than 6 symbols)
    // 10+ - valid ( 6+ symbols)
    return curr;
  }

  cssWidth(val) {
    return `${val}%`
  }

  classByType(type) {
    let css;
    switch (type) {
      case 0:
        css = 'red'
        break;
      case 1:
        css = 'orange'
        break;
      case 2:
        css = 'yellow'
        break;
      default:
        css = 'green'
        break;
    }
    return css;
  }

  ngOnChanges(changes: any) {
    this.rate = this.countRate(this.password);
    this.progress = ((this.rate >= 20) ? 20 : (this.rate || 0))/20
    if (this.rate < 10) this.rate_type = 0
    else if (this.rate < 14) this.rate_type = 1
    else if (this.rate < 18) this.rate_type = 2
    else this.rate_type = 3
    this.valid = (this.rate >= 10);
    console.log();
  }


  ngOnInit() {
  }
}
