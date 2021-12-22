import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { GruposComponent } from './grupos/grupos.component';
import { DocsComponent } from './docs/docs.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';



@NgModule({
  declarations: [
    GruposComponent,
    DocsComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule
  ],
  exports:[
    GruposComponent,
    DocsComponent
  ]
})
export class DifusionModule { }
