import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MunicipioComponent } from './municipio/municipio.component';
import { TemasComponent } from './temas/temas.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { TemasxmunicipioComponent } from './temasxmunicipio/temasxmunicipio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExamenComponent } from './examen/examen.component';
import { MensajesComponent } from './mensajes/mensajes.component';



@NgModule({
  declarations: [
    MunicipioComponent,
    TemasComponent,
    TemasxmunicipioComponent,
    ExamenComponent,
    MensajesComponent,
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
    MensajesComponent,
  ]
})
export class ConfiguracionModule { }
