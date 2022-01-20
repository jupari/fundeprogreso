import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grupo } from 'src/app/core/interfaces/grupos';
import { ModalGrupoService } from 'src/app/core/services/componentes/modal-grupo.service';
import { GrupoService } from 'src/app/core/services/grupos/grupos.service';


@Component({
  selector: 'app-modalgrupos',
  templateUrl: './modal-grupos.component.html',
  styleUrls: ['./modal-grupos.component.css']
})
export class ModalGruposComponent implements OnInit {

  @Input() limpiarForm:boolean=true;
  @Output() grupo: EventEmitter<Grupo> = new EventEmitter();

  formGrupo!: FormGroup

  constructor(public smodalgrupo: ModalGrupoService,
              private grupoService:GrupoService,
              private fb: FormBuilder) { 

  }

  ngOnInit(): void {

    this.formGrupo=this.fb.group({
      idGrupo:      [0],
      idCia:        [0],
      orden:        ['',[Validators.required]],
      nombre_Grupo: ['',[Validators.required]],
      descripcion:  ['',[Validators.required]],
      icono:        ['',[Validators.required]],
      activo:       [1]
    });

  }

  cerrarModal(){
    this.limpiar();
    this.smodalgrupo.cerrarModal() 
  }

  guardarGrupo(){
    console.log('Lo que voy a guardar: ',this.formGrupo.value)
    if(this.formGrupo.invalid){
      return;
    }
    this.grupoService.crearGrupo(this.formGrupo.value).subscribe((res:any)=>{
      console.log(res.value)
      this.grupo.emit(res.value);
    })
  }

  limpiar(){
    this.formGrupo.controls["orden"].setValue('');
    this.formGrupo.controls["nombre_Grupo"].setValue('');
    this.formGrupo.controls["descripcion"].setValue('');
    this.formGrupo.controls["icono"].setValue('');
  }

}
function OutPut() {
  throw new Error('Function not implemented.');
}

