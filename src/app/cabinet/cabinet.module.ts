import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'angular2-select';
import { Select2Module } from 'ng2-select2';
import { SharedModule } from '../shared/shared.module';
import { SharedModule as BaseSharedModule } from '../shared/shared.module';
import {
  BordersService, HousesService, ProfileService
} from '../_services';

import { CabinetSharedModule } from './shared/shared.module';
import { FileUploader } from '../_components/fileUploader/fileUploader.component';
import { SlimScrollModule } from 'ng2-slimscroll';
import { UiSwitchModule } from '../../../node_modules/angular2-ui-switch/src';
import { Ng2MapModule} from 'ng2-map';
import { ModalModule } from "ng2-modal";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, FormBuilder } from '@angular/forms';
import { CabinetGuardService } from './cabinet-guard.service';
import { UsersService, MailsService } from '../_services/index';
import { CabinetComponent } from './cabinet.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routing } from './cabinet.routing';
import { MapComponent } from './map/map.component';
import { EventsComponent } from './events/events.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent as EditProfileComponent } from './settings/profile/profile.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageFormComponent } from './messages/messageForm/messageForm.component';
import { ChatComponent } from './chat/chat.component';
import { ChatFileListComponent } from './chat/chatFileList/chatFileList.component';
import { ChatImagesListComponent } from './chat/chatImagesList/chatImagesList.component';
import { EmojiModule } from 'angular2-emoji';

@NgModule({
  imports: [
    CommonModule,
    CabinetSharedModule,
    ModalModule,
    SharedModule,
    BaseSharedModule,
    RouterModule,
    SelectModule,
    EmojiModule,
    Select2Module,
    ReactiveFormsModule,
    FormsModule,
    Select2Module,
    Ng2MapModule,
    UiSwitchModule,
    SlimScrollModule,
    routing
  ],
  declarations: [
    CabinetComponent,
    DashboardComponent,
    MessagesComponent,
    ChatComponent,
    ChatFileListComponent,
    ChatImagesListComponent,
    MessageFormComponent,
    MapComponent,
    FileUploader,
    EventsComponent,
    RecommendationsComponent,
    EventsComponent,
    AddEventComponent,
    EventDetailsComponent,
    EventDetailsComponent,
    ProfileComponent,
    SettingsComponent,
    EditProfileComponent
  ],
  providers: [
    CabinetGuardService,
    HousesService,
    UsersService,
    BordersService,
    MailsService,
    FormBuilder,
    EventDetailsComponent,
    HousesService,
    ProfileService
  ],
  bootstrap: [CabinetComponent]
})
export class CabinetModule { }
