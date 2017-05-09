import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';

import { SignUpGuardService } from './sign-up/sign-up-guard.service';
import { CabinetGuardService } from './cabinet/cabinet-guard.service';

import { AppLocalizedComponent } from './app-localized.component';
import { LoginRestoreComponent } from './login/restore/restore.component';
import { LoginMainComponent } from './login/main/main.component';
// popups
import { InviteFormPopupComponent } from './sign-up/popups/invite-form-popup.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: `/uk`,
    pathMatch: 'full'
  },
  {
    path: ':locale',
    component: AppLocalizedComponent,
    children: [
      { path: 'privacy', component: PrivacyComponent, pathMatch: 'full' },

      {
        path: 'sign-up',
        canActivate: [SignUpGuardService],
        loadChildren: './sign-up/sign-up.module#SignUpModule'
      },

      {
        path: '',
        component: LoginComponent
      },

      {
        path: 'cabinet',
        canActivate: [CabinetGuardService],
        loadChildren: './cabinet/cabinet.module#CabinetModule'
      },

      { path: '**', component: PageNotFoundComponent }
    ]
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
