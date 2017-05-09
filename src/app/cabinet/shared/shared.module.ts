import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
   ],
  exports: [
    HeaderComponent,
    SidebarComponent,
  ]
})
export class CabinetSharedModule { }
