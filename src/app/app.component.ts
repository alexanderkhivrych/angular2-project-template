import { Component } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends Translation {

  constructor(
    public locale: LocaleService,
    public translation: TranslationService
  ) {
    super(translation);

    this.locale.AddConfiguration()
      .AddLanguages(['en', 'uk', 'ru'])
      .SetCookieExpiration(30)
      .DefineLanguage('uk');
    this.locale.init();
    this.locale.setCurrentLanguage('uk');

    this.translation.AddConfiguration()
      .AddProvider('./locales/');
    this.translation.init();
  }

  selectLanguage(language: string): void {
    this.locale.setCurrentLanguage(language);
  }
}
