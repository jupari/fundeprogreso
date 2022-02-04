import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/core/interfaces/examen';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { ExamenService } from 'src/app/core/services/configuracion/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  constructor(public modalService:ModalService
              ,private examenService:ExamenService) { }

  examenes:Examen[]=[]


  ngOnInit(): void {
    this.consultar();
  }

  consultar(){
    this.examenService.consultar()
          .subscribe(res=>{
            this.examenes=res;
          })
  }

  editar(ex:Examen){
    this.abrirModal();    
  }



  abrirModal(){
    this.modalService.abrirModal();
  }
}
