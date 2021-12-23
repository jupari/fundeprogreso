import { Component, OnInit } from '@angular/core';
import { iMunicipios, Municipios } from 'src/app/core/mocks/municipios';
import { ModalDescargaArchivoService } from 'src/app/core/services/componentes/modal-descargaarchivos.service';

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

  constructor(public modaDescargaArchivoS: ModalDescargaArchivoService) { }
  termino:string='';
  MunicipiosSugeridos:iMunicipios[] = []; 
  mostrarSugerencia:boolean=false;
  mostrarResultados:boolean=false

  ngOnInit(): void {
    registerInit();
  }

  cerrarModal(){
    this.modaDescargaArchivoS.cerrarModal()
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

}