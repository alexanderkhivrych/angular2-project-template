import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { SignUpComponent } from './sign-up.component';
// import { SignUpGuard } from './sign-up-guard.service';

// pages
import { AddressComponent } from './address/address.component';
import { AccountComponent } from './account/account.component';

import { BorderComponent } from './border/border.component';
import { IntroComponent } from './border/intro/intro.component';
import { DrawComponent } from './border/draw/draw.component';
import { NameComponent } from './border/name/name.component';

import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DefaultComponent } from './confirmation/default/default.component';
import { MailComponent } from './confirmation/mail/mail.component';

// popups
import { InviteFormPopupComponent } from './popups/invite-form-popup.component';
import { BorderTipsComponent } from './border/tips/tips.component';

const signUpRoutes: Routes = [
  {
    path: '',
    component: SignUpComponent,
    children: [
      {
        path: '',
        redirectTo: 'address',
        pathMatch: 'full'
      },
      {
        path: 'address',
        component: AddressComponent,
        pathMatch: 'full'
      },
      {
        path: 'account',
        component: AccountComponent,
        pathMatch: 'full'
      },
      {
        path: 'confirm',
        component: ConfirmationComponent,
        children: [
          {
            path: '',
            component: DefaultComponent,
            pathMatch: 'full'
          },
          {
            path: 'mail',
            component: MailComponent
          }
        ]
      },
      {
        path: 'border',
        component: BorderComponent,
        children: [
          {
            path: 'intro',
            component: IntroComponent
          },
          {
            path: 'draw',
            component: DrawComponent
          },
          {
            path: 'name',
            component: NameComponent
          },
          {
            path: '',
            redirectTo: 'intro',
            pathMatch: 'full'
          }
        ]
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forChild(signUpRoutes);
