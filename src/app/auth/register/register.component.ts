import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrearUsuario } from 'src/app/core/interfaces/usuarios';
import { iMunicipios, Municipios } from 'src/app/core/mocks/municipios';
import { ModalDescargaArchivoService } from 'src/app/core/services/componentes/modal-descargaarchivos.service';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';
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
              private roter:Router) { }


  termino:string='';
  MunicipiosSugeridos:iMunicipios[] = []; 
  mostrarSugerencia:boolean=false;
  mostrarResultados:boolean=false


  //formulario

  formRegistro!:FormGroup; 

  ngOnInit(): void {
    registerInit();
     this.formRegistro = this.fb.group({
      nombreCompleto      : ['',[Validators.required]],
      nombreUsuario       : [''],
      clave               : ['',[Validators.required,Validators.minLength(6)]],     
      validar             : ['',[Validators.required]],     
      documentoIdentidad  : ['',[Validators.required]],
      telefono            : ['',[Validators.required]],
      direccion           : ['',[Validators.required]],
      email               : ['',[Validators.required,Validators.email]],
      municipio           : [''],
      usuario             : [''],
      rol                 : ['ASISTENTE'],
      imagen              : [''],
    })
  }

  buscar(termino:string){
    this.mostrarSugerencia=false;
    this.mostrarResultados=true
    this.termino=termino;
  }

  BuscarMcipio(termino:string){
    this.mostrarSugerencia=true;
    if (termino==''){
      this.mostrarSugerencia=false;
      this.mostrarResultados=false;
      this.MunicipiosSugeridos=[];  
    }else{
      this.MunicipiosSugeridos = Municipios.filter(valor=>
              valor.nombre.toLocaleLowerCase().includes(termino.toLocaleLowerCase())
            ).splice(0,7);
    }
  }

  guardarRegistro(){

    console.log(this.formRegistro.getError);
    if(this.formRegistro.invalid){return;}
    if(this.termino==""){return}

    const usuario:CrearUsuario={
      NombreUsuario       :this.formRegistro.get('email')?.value,
      Email               :this.formRegistro.get('email')?.value,
      Password            :this.formRegistro.get('clave')?.value,
      NombreCompleto      :this.formRegistro.get('nombreCompleto')?.value,
      DocumentoIdentidad  :this.formRegistro.get('documentoIdentidad')?.value,
      Telefono            :this.formRegistro.get('telefono')?.value,
      Direccion           :this.formRegistro.get('direccion')?.value,
      Municipio           :this.termino,
      idRol               :'0',
      TipoRol             :this.formRegistro.get('rol')?.value,
      activo              :true,
    }
    
    console.log(usuario);
    this.usuarioService.crearUsuario(usuario)
          .subscribe(res=>{
            Swal.fire('Registro',JSON.stringify(res),'success');
            this.limpiar();
            this.roter.navigateByUrl('/')
          })

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
}
