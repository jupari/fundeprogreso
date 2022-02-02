import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DifusionModule } from './difusion/difusion.module';
import { DashBoardModule } from './dashboard/dashboard.module';
import { ComponentesModule } from '../componentes/componentes.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CapacitacionModule } from './capacitacion/capacitacion.module';

import { PagesComponent } from './pages.component';
import { ConfiguracionModule } from './configuracion/configuracion.module';


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
    ComponentesModule,
    UsuariosModule,
    CapacitacionModule,
    ConfiguracionModule,
  ],
  exports:[
    PagesComponent

  ]
})
export class PagesModule { }
