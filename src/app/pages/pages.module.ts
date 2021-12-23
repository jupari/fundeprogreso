import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DifusionModule } from './difusion/difusion.module';
import { DashBoardModule } from './dashboard/dashboard.module';

import { PagesComponent } from './pages.component';
import { ComponentesModule } from '../componentes/componentes.module';



@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    DifusionModule,
    DashBoardModule,
    ComponentesModule
  ],
  exports:[
    PagesComponent

  ]
})
export class PagesModule { }