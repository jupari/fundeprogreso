import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalGruposComponent } from './grupos/modal-grupos.component';
import { ModaldocsComponent } from './modaldocs/modaldocs.component';




@NgModule({
  declarations: [
    ModalGruposComponent,
    ModaldocsComponent,

  ],
  imports: [
    CommonModule
  ],
  exports:[
    ModalGruposComponent
  ]
})
export class ComponentesModule { }
