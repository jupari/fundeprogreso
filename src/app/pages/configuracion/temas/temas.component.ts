import { Component, OnInit } from '@angular/core';
import { Tema } from 'src/app/core/interfaces/temas';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { TemaService } from 'src/app/core/services/configuracion/tema.service';
import Swal from 'sweetalert2';

declare function customInitFunction():any;

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  temas:Tema[]=[];
  tema:Tema;

  constructor(public modalService:ModalService
              ,private temaService:TemaService) { }

  ngOnInit(): void {
    customInitFunction();
    this.consultarTemas();
  }

  consultarTemas(){
    this.temaService.consultarTemas()
          .subscribe(res=>{
            console.log(res);
            this.temas=res;
          });
  }

  abrirModal(){
    this.modalService.abrirModal();
  }

  editarTema(ev:Tema){
    this.tema=ev;
    this.abrirModal();

  }

  actualizar(ev:boolean){
    if(ev){
      this.consultarTemas();
    }
  }
  eliminarTema(ev:Tema){
    Swal.fire({
          title: '¿Borrar Tema?',
          text: `Esta seguro de Borrar este Tema ${ev.tema} `,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Borrar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.temaService.eliminarTema(ev.idTema)
            .subscribe(res=>{
              Swal.fire(
                'Información',
                `El Tema ${ev.tema} se borró con éxito.`,
                'success');
                this.consultarTemas();
            })       
          }
        })
  }
}
