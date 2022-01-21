import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Perfil } from 'src/app/core/interfaces/perfil';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UploadmagenService } from 'src/app/core/services/cargararchivos/uploadmagen.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil:Perfil=this.auth.perfil;
  //https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470029.1604841957!2d72.29955005258641!3d23.019996818380896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C+Gujarat!5e0!3m2!1sen!2sin!4v1493204785508
  ubicacionmapa=`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAN0x-_cC7L8dX4wnN3bu9pOEUgkr4tKt0&address=${this.auth.perfil.direccion} ${this.auth.perfil.municipio}`
  public imagenSubir!:File;
 
  imagenBD:string = this.auth.perfil.imagen || '../../../../assets/images/foto-perfil.jpg';

  perfilForm!:FormGroup;

  get usuario():string{
    return localStorage.getItem('email')|| '';
  }

  constructor(public auth: AuthService,
              private fb: FormBuilder,
              private uploadImagen:UploadmagenService) 
  { 

  }

  ngOnInit(): void {
     this.perfilForm=this.fb.group({
      nombrecompleto:       [this.perfil.nombreCompleto,      [Validators.required]],
      documentoidentidad:   [this.perfil.documentoIdentidad,  [Validators.required]],
      email:                [this.perfil.email,               [Validators.required]],
      telefono:             [this.perfil.telefono,            [Validators.required]],
      direccion:            [this.perfil.direccion,           [Validators.required]],
      municipio:            [this.perfil.municipio,           [Validators.required]],
      usuario:              [this.perfil.usuario,             [Validators.required]],
      imagen:               [],
    });
    
   }

  
  //consulta la informacion de los perfiles
  traerInformacionPerfil(){
    this.auth.consultaPerfil(this.usuario)
    .subscribe((res:Perfil)=>{
         this.perfil=res;
       });
  }

  actualizarPerfil(){
   if(!this.perfilForm.value){return}
   this.perfilForm.controls["usuario"].setValue(this.usuario);

   this.auth.ActualizarPerfil(this.perfilForm.value)
            .subscribe(res=>{
              this.auth.perfil.nombreCompleto = this.perfilForm.controls["nombrecompleto"].value;
              this.auth.perfil.email = this.perfilForm.controls["email"].value;
              this.auth.perfil.telefono = this.perfilForm.controls["telefono"].value;
              this.auth.perfil.direccion = this.perfilForm.controls["direccion"].value;
            })
  }
  //subir y setear imagen seleccionada por el usuario
  setearImagen(file:File){
  if(file){
      this.imagenSubir = file;
      this.subirImagen();
    }
  }
  
  subirImagen(){
    this.uploadImagen.actualizarFotoPerfil(this.imagenSubir,this.usuario)
        .then(resp=>{
          this.imagenBD=resp || '../../../../assets/images/foto-perfil.jpg';
          this.auth.perfil.imagen = resp || '../../../../assets/images/foto-perfil.jpg';
        });
  }

}
