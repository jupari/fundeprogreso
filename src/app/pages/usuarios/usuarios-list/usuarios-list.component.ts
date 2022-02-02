import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/core/interfaces/usuarios';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';



declare function customInitFunction():any;

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  private _listado!:Usuarios[];

  usuarioEditar!:Usuarios;

  get listado():Usuarios[]{
    return this._listado;
  }

  constructor(private userService:UsuariosService,private modalService:ModalService) { 
  }

  ngOnInit(): void {
    customInitFunction();
    this.consultarUsuarios();
  }

  mostrarModal(){
    this.modalService.abrirModal();
  }

  consultarUsuarios() {
    this.userService.consultarUsuarios()
         .subscribe(resp=>{
          this._listado=resp
         })
  }

  editarUsuario(user:Usuarios){
    this.usuarioEditar=user;
    this.mostrarModal();
  }

}
