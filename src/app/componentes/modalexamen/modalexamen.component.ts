import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/core/services/componentes/modal.service';

@Component({
  selector: 'app-modalexamen',
  templateUrl: './modalexamen.component.html',
  styleUrls: ['./modalexamen.component.css']
})
export class ModalexamenComponent implements OnInit {

  constructor(public modalService:ModalService
              ,private fb:FormBuilder) { }

  formExamen:FormGroup;
  formPregunta:FormGroup;
  formRespuesta:FormGroup;

  mostrar:boolean=true;
  ocultar:boolean=false;

  ngOnInit(): void {
    this.formExamen=this.fb.group({
      idExamen          :[''],
      idTema            :['0'],
      nombre            :['',[Validators.required]],
      puntuacion        :[0,[Validators.required]],
      instrucciones     :[''],
    })

    this.formPregunta = this.fb.group({
      idPregunta      :[''],
      idExamen        :[''],
      pregunta        :['',[Validators.required]],
      puntos          :['',[Validators.required]],
    })

    this.formRespuesta = this.fb.group({
      idRespuesa        :[''],
      idPregunta        :[''],
      respuesta         :[''],
      correcta          :[''],
    })
  }

  guardarExamen(){}

  validarCampos(nombreCampo:string){}

  pasarSiguiente(){
    this.mostrar=false;
    this.ocultar=true;
  }

  pasarAnterior(){
    this.mostrar=true;
    this.ocultar=false;
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }

}
