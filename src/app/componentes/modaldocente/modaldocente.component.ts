import { Component, OnInit, Output,EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { Evento } from 'src/app/core/interfaces/evento';
import { CAdminService } from 'src/app/core/services/capacitacion/cadmin.service';
import { ModalService } from 'src/app/core/services/componentes/modal.service';


@Component({
  selector: 'app-modaldocente',
  templateUrl: './modaldocente.component.html',
  styleUrls: ['./modaldocente.component.css']
})
export class ModaldocenteComponent implements OnInit, OnChanges {

  formEvento:FormGroup;

  @Input() eventoEditar!:Evento;
  @Output() eventoGuardado:EventEmitter<boolean>=new EventEmitter();
  

  constructor( public modalService:ModalService
              ,private fb:FormBuilder
              ,public cadmin:CAdminService
              ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.eventoEditar.currentValue){
      console.log(changes.eventoEditar.currentValue)
      this.cargarEvento(changes.eventoEditar.currentValue.event);
    }
  }

  ngOnInit(): void {
    this.formEvento=this.fb.group({
        idEvento:         [''],
        idTema:           ['5'],
        titulo:           ['',  [Validators.required,Validators.minLength(6)]],
        descripcion:      ['',  [Validators.required]],
        fecha_Ini:        ['',  [Validators.required]],
        fecha_Fin:        ['',  [Validators.required]],
        todoElDia:        [1,   [Validators.required]],
        colorEvento:      ['bg-info',   [Validators.required]]
    })  
  }

  guardarEvento(){
    if(this.formEvento.invalid){
      return
    }

    if(this.formEvento.get('idEvento').value=='')
    {
      this.cadmin.guardarEvento(this.formEvento.value)
            .subscribe(res=>{
               if(res){
                 this.eventoGuardado.emit(true);
                 this.limpiar();
               } 
            })
    }else{
      this.cadmin.EditarEvento(this.formEvento.value)
            .subscribe(res=>{
              if(res){
                this.eventoGuardado.emit(true);
                this.limpiar();
              } 
     })
    }

  }

  validarCampos(nombreCampo:string){
    return this.formEvento.get(nombreCampo).invalid
              && this.formEvento.get(nombreCampo).touched
  }

  cargarEvento(ev:any){
    console.log(ev);
    const {  decription } = ev.extendedProps
    const start=new Date(ev.start).toISOString().substring(0, 10);
    const end =new Date(ev.end).toISOString().substring(0,10);
    this.formEvento.patchValue({
       idEvento:    ev.id,
       idTema:      ev.id,
       titulo:      ev.title,
       descripcion: decription,
       fecha_Ini:   start,
       fecha_Fin:   end,
       todoElDia:   ev.allDay,
       colorEvento: ev.classNames[1]
     });

  }

  limpiar(){
    this.formEvento.patchValue({
      idEvento:    '',
      idTema:      '',
      titulo:      '',
      descripcion: '',
      fecha_Ini:   '',
      fecha_Fin:   '',
      todoElDia:   '1',
      colorEvento: ''
    });

  }

  cerrarModal(){
    this.limpiar();
    this.modalService.cerrarModal();
  }
}
