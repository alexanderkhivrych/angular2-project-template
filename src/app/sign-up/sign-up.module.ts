import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignUpComponent } from './sign-up.component';
import { routing } from './sign-up.routing';

import { BordersService, HousesService, LocationsService } from '../_services/index'
import { GenderTypes } from '../_services/gender-types'

import { SelectModule } from 'angular2-select';
// pages
// parts
import { SharedModule } from '../shared/shared.module';
import { AddressComponent } from './address/address.component';
import { AccountComponent } from './account/account.component';
import { BorderComponent } from './border/border.component';
import { IntroComponent } from './border/intro/intro.component';
import { DrawComponent } from './border/draw/draw.component';
import { NameComponent } from './border/name/name.component';
import { BorderTipsComponent } from './border/tips/tips.component';
import { PasswordRateComponent } from './shared/password-rate.component';

import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DefaultComponent } from './confirmation/default/default.component';
import { MailComponent } from './confirmation/mail/mail.component';
import { PopupComponent } from './confirmation/popup.component';
import { TipsComponent } from './address/tips.component';

import { InviteFormPopupComponent } from './popups/invite-form-popup.component';

@NgModule({
  declarations: [
    SignUpComponent,
    AddressComponent,
    AccountComponent,
    BorderComponent,
    IntroComponent,
    DrawComponent,
    NameComponent,
    BorderTipsComponent,
    PasswordRateComponent,
    ConfirmationComponent,
    DefaultComponent,
    MailComponent,
    PopupComponent,
    InviteFormPopupComponent,
    TipsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    SelectModule,
    routing
  ],
  providers: [
    LocationsService,
    HousesService,
    BordersService,
    GenderTypes
  ],
  bootstrap: [SignUpComponent]
})
export class SignUpModule { }
