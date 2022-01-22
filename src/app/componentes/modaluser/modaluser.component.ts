import { Component, Input, OnInit, Output,EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios,CrearUsuario } from 'src/app/core/interfaces/usuarios';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';

@Component({
  selector: 'app-modaluser',
  templateUrl: './modaluser.component.html',
  styleUrls: ['./modaluser.component.css']
})
export class ModaluserComponent implements OnInit, OnChanges {

  constructor(public smodal: ModalService,
              private fb:FormBuilder,
              private userService:UsuariosService) { }
  

 

  formSubmitted:boolean=false;
  

  /* formUser: FormGroup = this.fb.group({
    usuario:      ['',[Validators.required,Validators.email]],
    claveUsuario: ['',[Validators.required,Validators.minLength(6)]],
    validar:      ['',[Validators.required]],
    rol:          ['',[Validators.required]]
  },{
    Validators: this.clavesIguales('claveUsuario','validar')
  }
  ) */

  formUser: FormGroup = this.fb.group({
    usuario:      ['',[Validators.required,Validators.email]],
    rol:          ['',[Validators.required]],
    activo:       [true]
  })

  @Input() userEditar!:Usuarios;
  @Output() resUsuario: EventEmitter<Usuarios> = new EventEmitter();

  @ViewChild('selectRol') selectRol!:ElementRef;


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.userEditar.currentValue){
      this.userEditar=changes.userEditar.currentValue;
      this.cargaUsuario(changes.userEditar.currentValue);
    }
  }


  guardarUsuario(){
    this.formSubmitted=true;
    if(this.formUser.invalid){return;}
    
    const rol:string=this.formUser.get('rol')?.value;
    
    const usuarioActualizar:CrearUsuario={
      NombreUsuario       :this.userEditar.NombreUsuario,
      Email               :this.formUser.get('usuario')?.value,
      Password            :'',
      NombreCompleto      :'',
      DocumentoIdentidad  :'',
      Telefono            :'',
      Direccion           :'',
      Municipio           :'',
      idRol               :'0',
      TipoRol             :rol.trim(),
      activo              :this.formUser.get('activo')?.value

   
    }; 

    this.userService.editarUsuario(usuarioActualizar)
          .subscribe(res=>{
            this.resUsuario.emit(res);
            this.cerrarModal();
          })

  }

  claveNoValida(){
    const clave1 = this.formUser.get('claveUsuario')?.value;
    const clave2 = this.formUser.get('validar')?.value;

    if((clave1!==clave2) && this.formSubmitted)
    {
      return true;
    }else{
      return false;
    }

  }

  limpiar(){
    this.formUser.get('usuario')?.setValue('');
    this.formUser.get('rol')?.setValue(null);
    this.formUser.get('activo')?.setValue(false);
  }

  cargaUsuario(user:Usuarios){
    this.formUser.get('usuario')?.setValue(user.Email);
    this.formUser.get('rol')?.setValue(user.TipoRol);
    this.formUser.get('activo')?.setValue(user.activo);

    let rol:string = user.TipoRol.trim();
    
    if (rol=='ADMINISTRADOR'){
      this.selectRol.nativeElement.options.item(1).selected = 'selected';
    }else{
      if(rol=='DOCENTE'){
        this.selectRol.nativeElement.options.item(2).selected = 'selected';
      }else{
        this.selectRol.nativeElement.options.item(3).selected = 'selected';
      }
    }
  }

  onChangeSelect(ev:any){
    console.log(ev.target[0].value);
  }

  clavesIguales(clave1nombre:string, clave2nombre:string){
    return (formGroup:FormGroup)=>{
      const campo1=formGroup.get(clave1nombre);
      const campo2=formGroup.get(clave2nombre);

      if(campo1?.value===campo1?.value){
        campo2?.setErrors(null);
      }else{
        campo2?.setErrors({noEsIgual:true});
      }
    }
  }

  cerrarModal(){
    this.smodal.cerrarModal()
  }
}
