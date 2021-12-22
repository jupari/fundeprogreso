import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

const routes: Routes=[
    {
        path:'admin',
        component: PagesComponent,
        loadChildren: ()=>import('./pageschild-routing').then(m=>m.PagesChildRouting)
    }
]

@NgModule({
    declarations:[],
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class PagesRoutingModule{}