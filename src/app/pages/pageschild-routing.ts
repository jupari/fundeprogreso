import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocsComponent } from './difusion/docs/docs.component';
import { GruposComponent } from './difusion/grupos/grupos.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';

const child:Routes = [
   { path:'dashboard', component:DashboardComponent,data: { titulo: 'Dashboard',subtitulo:'Principal' } },
   { path:'usuarios/usuarios-list', component:UsuariosListComponent ,data: { titulo: 'Usuarios',subtitulo:'Perfil' } },
   { path:'usuarios/perfil', component:PerfilComponent,data: { titulo: 'Usuarios',subtitulo:'Perfil' } },
   { path:'difusion/grupos', component:GruposComponent,data: { titulo: 'difusion',subtitulo:'Grupos' } },
   { path:'difusion/docs', component:DocsComponent,data: { titulo: 'difusion',subtitulo:'Documentos' } },
]

@NgModule({
    imports: [RouterModule.forChild(child)],
    exports: [RouterModule],

})
export class PagesChildRouting { }
