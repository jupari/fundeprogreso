import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/core/interfaces/usuarios';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  private _listado!:Usuarios[];

  get listado():Usuarios[]{

    return this._listado;
  }

  constructor(private userService:UsuariosService) { 

   
  }

  ngOnInit(): void {
    this.consultarUsuarios();
  }

  consultarUsuarios() {
    this.userService.consultarUsuarios()
         .subscribe(resp=>{
          this._listado=resp
         })
  }

}
