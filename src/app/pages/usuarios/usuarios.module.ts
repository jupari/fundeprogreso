import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModaluserComponent } from 'src/app/componentes/modaluser/modaluser.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';



@NgModule({
  declarations: [PerfilComponent, UsuariosListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule
  ],
  exports:[PerfilComponent,UsuariosListComponent]
})
export class UsuariosModule { }
