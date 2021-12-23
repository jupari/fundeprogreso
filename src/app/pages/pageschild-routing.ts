import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocsComponent } from './difusion/docs/docs.component';
import { GruposComponent } from './difusion/grupos/grupos.component';

const child:Routes = [
   { path:'dashboard', component:DashboardComponent,data: { titulo: 'Dashboard',subtitulo:'Principal' } },
   { path:'difusion/grupos', component:GruposComponent,data: { titulo: 'difusion',subtitulo:'Grupos' } },
   { path:'difusion/docs', component:DocsComponent,data: { titulo: 'difusion',subtitulo:'Documentos' } },
]

@NgModule({
    imports: [RouterModule.forChild(child)],
    exports: [RouterModule],

})
export class PagesChildRouting { }
