import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PsharedModule } from './pshared/pshared.module';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DeployComponent } from './deploy/deploy.component';
import { PublicpagesComponent } from './publicpages.component';

@NgModule({
  declarations: [
    PublicpagesComponent,
    HomeComponent,
    DeployComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PsharedModule
  ]

})
export class PublicpagesModule { }
