import { Component, OnInit } from '@angular/core';
import { NavigationMenu } from 'src/app/core/interfaces/NavigationMenu';
import { Perfil } from 'src/app/core/interfaces/perfil';
import { AuthService } from 'src/app/core/services/auth/auth.service';


declare function sidebarMenuInit():any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems:NavigationMenu[]|undefined;

  perfil:Perfil={};

  imagenBD:string =""; 

  /* constructor(private menuNavigation: ApiService ) { 
    this.menuItems = this.menuNavigation.getMenuNavigation();
  } */

  constructor(public authService:AuthService) {
    this.menuItems = localStorage.getItem('menu')? JSON.parse(localStorage.getItem('menu')!): [];  
  }

  usuario:string = '';
  rol:string = '';


  ngOnInit(): void {
    sidebarMenuInit();
    
    this.usuario = this.authService.usuario;
    this.rol = this.authService.rol;
    this.imagenBD=this.authService.perfil.imagen || '../../../../assets/images/avatar.png';
    this.perfil= this.authService.perfil;
  
  }

}
