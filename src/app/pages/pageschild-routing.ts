import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapacitacionAdminComponent } from './capacitacion/capacitacion-admin/capacitacion-admin.component';
import { CapacitacionComponent } from './capacitacion/capacitacion-participante/capacitacion.component';
import { MunicipioComponent } from './configuracion/municipio/municipio.component';
import { TemasComponent } from './configuracion/temas/temas.component';
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
   { path:'capacitacion/calendario', component:CapacitacionComponent,data: { titulo: 'capacitación',subtitulo:'calendario' } },
   { path:'capacitacion/docente', component:CapacitacionAdminComponent,data: { titulo: 'capacitación',subtitulo:'docente' } },
   { path:'configuracion/municipios', component:MunicipioComponent,data: { titulo: 'configuración',subtitulo:'municipio' } },
   { path:'configuracion/temas', component:TemasComponent,data: { titulo: 'configuración',subtitulo:'temas' } },
]

@NgModule({
    imports: [RouterModule.forChild(child)],
    exports: [RouterModule],

})
export class PagesChildRouting { }
