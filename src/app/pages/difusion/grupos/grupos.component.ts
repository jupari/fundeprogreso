import { Component, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { Grupo } from 'src/app/core/interfaces/grupos';
import { ModalGrupoService } from 'src/app/core/services/componentes/modal-grupo.service';
import { GrupoService } from 'src/app/core/services/grupos/grupos.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  grupos: Grupo[]=[]
  grupoEditar!:Grupo;

  @ViewChild('table') table:any;

  constructor(private smodalgrupo:ModalGrupoService,
              public grupoService: GrupoService) { }

  ngOnInit(): void {
    this.consultarGrupos();
  }

  mostrarModal(){
    this.smodalgrupo.abrirModal();
  }

  consultarGrupos(){
    this.grupoService.consultarGrupos().subscribe(res=>{
      this.grupos=res;
    })
  }

  editarGrupo(grupo:Grupo){
    this.grupoEditar=grupo;
    this.smodalgrupo.abrirModal();
  }

  eliminarGrupo( grupo:Grupo ){
    Swal.fire({
      title: '¿Borrar Grupo?',
      text: `Esta seguro de Borrar este grupo ${grupo.nombre_Grupo} `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.grupoService.eliminarGrupo(grupo)
        .subscribe(res=>{
          Swal.fire(
            'Información',
            `El grupo ${grupo.nombre_Grupo} se borró con éxito.`,
            'success');
            this.consultarGrupos();
        })       
      }
    })
  }
}
