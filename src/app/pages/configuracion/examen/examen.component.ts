import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/core/interfaces/examen';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { ExamenService } from 'src/app/core/services/configuracion/examen.service';
import Swal from 'sweetalert2';

declare function customInitFunction():any;

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  constructor(public modalService:ModalService
              ,private examenService:ExamenService) { }

  examenes:Examen[]=[]
  editarExamen:Examen;

  ngOnInit(): void {
    customInitFunction();
    this.consultar();
  }

  consultar(){
    this.examenService.consultar()
          .subscribe(res=>{
            this.examenes=res;
          })
  }

  editar(ex:Examen){
    this.editarExamen=ex;
    this.abrirModal();
  }

  eliminar(ex:Examen){
    Swal.fire({
      title: '¿Borrar Examen?',
      text: `Esta seguro de Borrar este Examen ${ex.nombre} `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenService.eliminar(ex.idExamen)
        .subscribe(res=>{
          Swal.fire(
            'Información',
            `El examen ${ex.nombre} se borró con éxito.`,
            'success');
            this.consultar();
        })       
      }
    })
  }



  abrirModal(){
    this.modalService.abrirModal();
  }
}
