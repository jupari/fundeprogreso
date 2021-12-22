import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { GruposComponent } from './grupos/grupos.component';
import { DocsComponent } from './docs/docs.component';



@NgModule({
  declarations: [
    GruposComponent,
    DocsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    GruposComponent,
    DocsComponent
  ]
})
export class DifusionModule { }
