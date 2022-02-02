import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MunicipioComponent } from './municipio/municipio.component';
import { TemasComponent } from './temas/temas.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';



@NgModule({
  declarations: [
    MunicipioComponent,
    TemasComponent,
  ],
  imports: [
    CommonModule,
    ComponentesModule
  ],
  exports:[
    MunicipioComponent,
    TemasComponent,
  ]
})
export class ConfiguracionModule { }
