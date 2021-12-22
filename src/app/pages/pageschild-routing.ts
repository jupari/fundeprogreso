import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocsComponent } from './difusion/docs/docs.component';
import { GruposComponent } from './difusion/grupos/grupos.component';

const child:Routes = [
   { path:'dashboard', component:DashboardComponent },
   { path:'difusion/grupos', component:GruposComponent },
   { path:'difusion/docs', component:DocsComponent },
]

@NgModule({
    imports: [RouterModule.forChild(child)],
    exports: [RouterModule],

})
export class PagesChildRouting { }
