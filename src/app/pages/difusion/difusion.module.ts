import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentesModule } from 'src/app/componentes/componentes.module';

import { GruposComponent } from './grupos/grupos.component';
import { DocsComponent } from './docs/docs.component';




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
