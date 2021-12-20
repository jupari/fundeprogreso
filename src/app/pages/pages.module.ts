import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';





@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports:[
    PagesComponent,
    DashboardComponent    
  ]
})
export class PagesModule { }
