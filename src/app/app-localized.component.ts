import { Component, OnInit, Optional, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';

import {
  NG_MAP_CONFIG_TOKEN,
  ConfigOption
} from 'ng2-map';

@Component({
  selector: 'app-localized',
  templateUrl: './app-localized.component.html',
  styles: []
})
export class AppLocalizedComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public locale: LocaleService,
    public translation: TranslationService,
    @Optional() @Inject(NG_MAP_CONFIG_TOKEN) private config
  ) {
  }

  ngOnInit() {
    // eval('window.rrr = this');
    this.route.params.subscribe(params => {
      if (!('locale' in params)) { return; };
      let localeFound = false;
      this.locale.getAvailableLanguages().forEach((locale) => {
        if (locale === params['locale']) {
          this.locale.setCurrentLanguage(locale);
          this.config.apiUrl = this.config.apiUrl.replace(/language=([a-z]{2})/, `language=${locale}`);
          localeFound = true;
        }
      });
      if (!localeFound) {
        this.router.navigate([`../${this.locale.getDefaultLocale()}`], { relativeTo: this.route });
      }
    });
  }
}
