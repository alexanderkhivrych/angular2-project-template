import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Ng2MapModule} from 'ng2-map';

import { EmailValidator, ConfirmationValidator, DisplayError, CheckError } from '../_directives/index';

import { HeaderComponent } from './header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {
  CollectionComponent as TabsCollectionComponent,
  ItemComponent as TabsItemComponent
} from './tabs/index';

import { TranslationModule } from 'angular-l10n';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    EmailValidator, ConfirmationValidator, DisplayError, CheckError,
    HeaderComponent,
    TabsCollectionComponent,
    TabsItemComponent
  ],
  imports: [
    Ng2MapModule,
    TranslationModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    TranslationModule, Ng2MapModule,
    EmailValidator, ConfirmationValidator, DisplayError, CheckError,
    HeaderComponent,
    TabsCollectionComponent, TabsItemComponent,
    PageNotFoundComponent
  ]
})
export class SharedModule { }
