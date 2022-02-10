import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PsharedModule } from './pshared/pshared.module';
import { NgxCaptchaModule } from 'ngx-captcha';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DeployComponent } from './deploy/deploy.component';
import { PublicpagesComponent } from './publicpages.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { ContactoComponent } from './contacto/contacto.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PublicpagesComponent,
    HomeComponent,
    DeployComponent,
    ContactoComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PsharedModule,
    ComponentesModule,
    NgxCaptchaModule
  ]

})
export class PublicpagesModule { }
