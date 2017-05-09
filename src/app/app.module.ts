// system
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';

// vendor
import { Ng2MapModule } from 'ng2-map';


// additional
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { LocalStorageModule } from 'angular-2-local-storage';
import {
  AuthService, SessionService, ApiRequestService, AccountService
} from './_services/index';

// translation
import { TranslationModule } from 'angular-l10n';

// guards
import { SignUpGuardService } from './sign-up/sign-up-guard.service';
import { CabinetGuardService } from './cabinet/cabinet-guard.service';
// pages
import { LoginComponent } from './login/login.component';
import { PrivacyComponent } from './privacy/privacy.component';
// parts
import { SharedModule } from './shared/shared.module';
import { LoginRestoreComponent } from './login/restore/restore.component';
import { LoginMainComponent } from './login/main/main.component';
import { AppLocalizedComponent } from './app-localized.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrivacyComponent,
    LoginRestoreComponent,
    LoginMainComponent,
    AppLocalizedComponent
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'susid.online',
      storageType: 'localStorage'
    }),
    Ng2MapModule.forRoot({
      apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBhV7uYZZssuK1CDHK3_mAvqIM1uo_Nwv4&language=uk&libraries=places,drawing'
    }),
    TranslationModule.forRoot(),
    SharedModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthService,
    SessionService,
    SignUpGuardService,
    CabinetGuardService,
    ApiRequestService,
    AccountService,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
