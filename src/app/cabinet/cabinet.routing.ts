import { Routes, RouterModule } from '@angular/router';
import { CabinetGuardService } from './cabinet-guard.service';

import { CabinetComponent } from './cabinet.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { ChatComponent } from './chat/chat.component';
import { ChatFileListComponent } from './chat/chatFileList/chatFileList.component';
import { ChatImagesListComponent } from './chat/chatImagesList/chatImagesList.component';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

// Events
import { EventsComponent } from './events/events.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';

// Recommendations
import { RecommendationsComponent } from './recommendations/recommendations.component';

const cabinetRoutes: Routes = [
  {
    path: '',
    component: CabinetComponent,
    canActivate: [CabinetGuardService],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full'
      },
      {
        path: 'settings',
        component: SettingsComponent,
        pathMatch: 'full'
      },
      {
        path: 'messages',
        component: MessagesComponent,
        pathMatch: 'full'
      },
      {
        path: 'chat/:id',
        component: ChatComponent,
      },
      {
        path: 'chat/:id/files',
        component: ChatFileListComponent,
      },
      {
        path: 'chat/:id/images',
        component: ChatImagesListComponent,
      },
      {
        path: 'map',
        component: MapComponent,
        pathMatch: 'full',
      },
      {
        path: 'events',
        component: EventsComponent,
        pathMatch: 'full'
      },
      {
        path: 'events/new',
        component: AddEventComponent
      },
      {
        path: 'events/:id',
        component: EventDetailsComponent
      },
      {
        path: 'recommendations',
        component: RecommendationsComponent,
        pathMatch: 'full'
      }
    ]
  }
];

export const routing = RouterModule.forChild(cabinetRoutes);
