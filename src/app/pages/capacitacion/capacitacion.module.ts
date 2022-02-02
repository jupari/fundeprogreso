import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacitacionAdminComponent } from './capacitacion-admin/capacitacion-admin.component';
import { CapacitacionComponent } from './capacitacion-participante/capacitacion.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

import { FullCalendarModule } from 'primeng/fullcalendar'; 





@NgModule({
  declarations: [
    CapacitacionComponent,
    CapacitacionAdminComponent,

  ],
  imports: [
    CommonModule,
    ComponentesModule,
    FullCalendarModule

  ],
  exports:[
    CapacitacionComponent,
    CapacitacionAdminComponent,

  ]
})
export class CapacitacionModule { }
