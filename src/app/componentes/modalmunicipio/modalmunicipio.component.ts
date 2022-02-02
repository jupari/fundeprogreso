import { Component, Input, OnInit, Output,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Municipio } from 'src/app/core/interfaces/municipio';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { MunicipioService } from 'src/app/core/services/configuracion/municipio.service';


@Component({
  selector: 'app-modalmunicipio',
  templateUrl: './modalmunicipio.component.html',
  styleUrls: ['./modalmunicipio.component.css']
})
export class ModalmunicipioComponent implements OnInit, OnChanges {

  formMunicipio:FormGroup;

  @Input() municipioEditar:Municipio;
  @Output() actualizar:EventEmitter<boolean>= new EventEmitter();

  constructor(public modalService:ModalService
              ,private fb:FormBuilder
              ,private municipioService:MunicipioService  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.municipioEditar.currentValue){
        this.cargarMunicipio(changes.municipioEditar.currentValue);
    }
  }

  ngOnInit(): void {
    this.formMunicipio=this.fb.group({
      idMunicipio:   [''],
      nombre:        ['',[Validators.required]],
      activo:        [1] 
    })
  }

  guardarMunicipio(){
    if(this.formMunicipio.invalid){return}

    if(this.formMunicipio.get('idMunicipio').value){
      this.municipioService.EditarMunicipio(this.formMunicipio.value)
          .subscribe(res=>{
            if(res){
              this.actualizar.emit(true)
              this.limpiar();
            }
          })
    }else{
      this.municipioService.crearMunicipio(this.formMunicipio.value)
      .subscribe(res=>{
        if(res){
          this.actualizar.emit(true)
          this.limpiar();
        }
      });
    }

    
  }

  cargarMunicipio(municipio:Municipio){
    this.formMunicipio.patchValue({
      idMunicipio:  municipio.idMunicipio,
      nombre:       municipio.nombre,
      activo:       municipio.activo
    })
  }

  limpiar(){
    this.formMunicipio.patchValue({
      idMunicipio:  '',
      nombre:       '',
      activo:       1
    })
  }

  cerrarModal(){
    this.limpiar();
    this.modalService.cerrarModal();
  }

}
