import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeployComponent } from './deploy/deploy.component';
import { HomeComponent } from './home/home.component';

const rutashijas:Routes=[
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'deploy',
        component:DeployComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(rutashijas)],
    exports:[RouterModule]
})

export class RutasModule{}