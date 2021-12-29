import { NgModule}  from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverpassComponent } from './recoverpass/recoverpass.component';

const routes: Routes = [

    {path:'login', component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'recoverpass',component:RecoverpassComponent}

]

@NgModule({
    declarations:[],
    imports:[
        RouterModule.forChild(routes),
        CommonModule
    ],
    exports:[RouterModule]
})

export class AuthRoutingModule{}