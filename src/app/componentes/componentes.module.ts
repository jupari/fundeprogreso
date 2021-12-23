import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalGruposComponent } from './grupos/modal-grupos.component';
import { ModaldocsComponent } from './modaldocs/modaldocs.component';
import { ModaldescargaComponent } from './modaldescarga/modaldescarga.component';
import { BuscarMcipiosComponent } from './buscar-mcipios/buscar-mcipios.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ModalGruposComponent,
    ModaldocsComponent,
    ModaldescargaComponent,
    BuscarMcipiosComponent,

  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    ModalGruposComponent,
    ModaldocsComponent,
    ModaldescargaComponent,
    BuscarMcipiosComponent

  ]
})
export class ComponentesModule { }
