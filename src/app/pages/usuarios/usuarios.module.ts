import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PerfilComponent, UsuariosListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[PerfilComponent,UsuariosListComponent]
})
export class UsuariosModule { }
