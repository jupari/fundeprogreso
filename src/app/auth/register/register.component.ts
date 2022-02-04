import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrearUsuario } from 'src/app/core/interfaces/usuarios';
import { ModalDescargaArchivoService } from 'src/app/core/services/componentes/modal-descargaarchivos.service';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';
import { ValidacionEmailService } from 'src/app/core/services/usuarios/validacio-email.service';
import Swal from 'sweetalert2';

declare function registerInit():any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css',
    '../../../assets/plugins/register-steps/steps.css',
    '../../../assets/css/pages/register3.css'
  ]
})
export class RegisterComponent implements OnInit {

  constructor(public modaDescargaArchivoS: ModalDescargaArchivoService,
              private fb:FormBuilder,
              private usuarioService: UsuariosService,
              private roter:Router,
              private validacionEmailService: ValidacionEmailService ) { }


  termino:string='';
  mostrarResultados:boolean=false

  //variable para establecer si el formulario fue enviado
  formSubmitted=false;
  //validaciones por expresiones regulares del nombre y apellido y del email  
  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern         : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  //formulario

  formRegistro!:FormGroup; 

  
  ngOnInit(): void {
    registerInit();
     this.formRegistro = this.fb.group({
      nombreCompleto      : ['',[Validators.required,Validators.pattern(this.nombreApellidoPattern)]],
      nombreUsuario       : [''],
      clave               : ['',[Validators.required,Validators.minLength(6)]],     
      validar             : ['',[Validators.required]],     
      documentoIdentidad  : ['',[Validators.required]],
      telefono            : ['',[Validators.required]],
      direccion           : ['',[Validators.required]],
      email               : ['',[Validators.required,Validators.pattern(this.emailPattern)],[this.validacionEmailService]],
      idMunicipio         : [''],
      municipio           : [''],
      usuario             : [''],
      rol                 : ['ASISTENTE'],
      imagen              : [''],
    },{
      validators:[this.validacionPassword('clave','validar')]
    })
  }

  get emailErrors():string{
    const error = this.formRegistro.get('email')?.errors;
    if( error?.required){
      return "El Email es un campo obligatorio.";
    }else if(error?.pattern){
      return "El email no tiene el formato correcto"
    }else if(error?.emailExiste){
      return "El Email ya existe en la Base de Datos"
    }
    return "";
  }

  validarCampos(nombreCampo:string){
    return this.formRegistro.get(nombreCampo)?.invalid 
            && this.formRegistro.get(nombreCampo)?.touched 
  }

  terminoSeleccionado(ev:string){
    this.termino=ev;
  }

  idMunicipioSeleccionado(ev:number){
    this.formRegistro.get('idMunicipio').setValue(ev);
  }

  guardarRegistro(){
    if(this.formRegistro.invalid){
      this.formRegistro.markAsTouched();
      return;
    }
    
    if(this.termino==""){return}
    //pone la variable de enviado en true y revisa las claves
    //que sean iguales
    this.formSubmitted = true
    //******/
    const usuario:CrearUsuario={
      NombreUsuario       :this.formRegistro.get('email')?.value,
      Email               :this.formRegistro.get('email')?.value,
      Password            :this.formRegistro.get('clave')?.value,
      NombreCompleto      :this.formRegistro.get('nombreCompleto')?.value,
      DocumentoIdentidad  :this.formRegistro.get('documentoIdentidad')?.value,
      Telefono            :this.formRegistro.get('telefono')?.value,
      Direccion           :this.formRegistro.get('direccion')?.value,
      IdMuncipio          :this.formRegistro.get('idMunicipio')?.value,
      Municipio           :this.termino,
      idRol               :'0',
      TipoRol             :this.formRegistro.get('rol')?.value,
      activo              :true,
    }
    
    this.usuarioService.crearUsuario(usuario)
          .subscribe(res=>{
            Swal.fire('Registro',JSON.stringify(res),'success');
            this.limpiar();
            this.roter.navigateByUrl('/')
          })

  }

  //metodo que permite validar si el usuario digito bien las dos
  //claves para ingresar a su perfil.
  validacionPassword( campo1: string, campo2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if ( pass1 !== pass2 ) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true }
      } 



      formGroup.get(campo2)?.setErrors(null);

      return null
    }

  }

  validarMunicipioVacio(){
    if(this.termino==''){
      return true;
    }else{
      return false;
    }
  }

  limpiar(){
    this.formRegistro.patchValue({
      nombreCompleto      : '',
      nombreUsuario       : '',
      clave               : '',     
      validar             : '',     
      documentoIdentidad  : '',
      telefono            : '',
      direccion           : '',
      email               : '',
      municipio           : '',
      usuario             : '',
      rol                 : 'ASISTENTE',
      imagen              : ''
    })  
  }


  
  validarSiguientePaso1(){
    return this.formRegistro.get('nombreCompleto')?.invalid 
          && this.formRegistro.get('documentoIdentidad')?.invalid
          && this.formRegistro.get('telefono')?.invalid
          && this.formRegistro.get('direccion')?.invalid
 
    
  }

 
}
