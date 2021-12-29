import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';



@NgModule({
  declarations: [PerfilComponent, UsuariosListComponent],
  imports: [
    CommonModule
  ],
  exports:[PerfilComponent,UsuariosListComponent]
})
export class UsuariosModule { }
