import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MunicipioComponent } from './municipio/municipio.component';
import { TemasComponent } from './temas/temas.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { TemasxmunicipioComponent } from './temasxmunicipio/temasxmunicipio.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MunicipioComponent,
    TemasComponent,
    TemasxmunicipioComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentesModule
  ],
  exports:[
    MunicipioComponent,
    TemasComponent,
    TemasxmunicipioComponent,
  ]
})
export class ConfiguracionModule { }
