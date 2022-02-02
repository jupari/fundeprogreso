import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropzoneModule, DropzoneConfigInterface,
  DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';


import { ModalGruposComponent } from './grupos/modal-grupos.component';
import { ModaldocsComponent } from './modaldocs/modaldocs.component';
import { ModaldescargaComponent } from './modaldescarga/modaldescarga.component';
import { BuscarMcipiosComponent } from './buscar-mcipios/buscar-mcipios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropzoneCtrlComponent } from './dropzone/dropzone.component';
import { ModaluserComponent } from './modaluser/modaluser.component';
import { ModalcapacitacionComponent } from './modalcapacitacion/modalcapacitacion.component';
import { ModaldocenteComponent } from './modaldocente/modaldocente.component';
import { ModalmunicipioComponent } from './modalmunicipio/modalmunicipio.component';
import { ModaltemaComponent } from './modaltema/modaltema.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
 
};


@NgModule({
  declarations: [
    ModalGruposComponent,
    ModaldocsComponent,
    ModaldescargaComponent,
    BuscarMcipiosComponent,
    DropzoneCtrlComponent,
    ModaluserComponent,
    ModalcapacitacionComponent,
    ModaldocenteComponent,
    ModalmunicipioComponent,
    ModaltemaComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    DropzoneModule
  ],
  exports:[
    ModalGruposComponent,
    ModaldocsComponent,
    ModaldescargaComponent,
    BuscarMcipiosComponent,
    DropzoneCtrlComponent,
    ModaluserComponent,
    ModalcapacitacionComponent,
    ModaldocenteComponent,
    ModalmunicipioComponent,
    ModaltemaComponent,

  ],
  providers:[
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class ComponentesModule { }
