import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { iMunicipios,Municipios } from 'src/app/core/mocks/municipios';
import { ModalDocService } from 'src/app/core/services/componentes/modal-doc.service';

declare function dropzone():any;

@Component({
  selector: 'app-modaldocs',
  templateUrl: './modaldocs.component.html',
  styleUrls: ['./modaldocs.component.css']
})
export class ModaldocsComponent implements OnInit {

  constructor(public  smodalDoc: ModalDocService) { }

  termino:string='';
  MunicipiosSugeridos:iMunicipios[] = []; 
  mostrarSugerencia:boolean=false;
  mostrarResultados:boolean=false
  
  config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    uploadMultiple:true,
    addRemoveLinks:true,
    acceptedFiles: 'application/pdf',
    createImageThumbnails: true,

  };



  ngOnInit(): void {
    dropzone();
  }

  cerrarModal(){
    this.smodalDoc.cerrarModal()
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

  traerFiles(archivo:File[]){
    console.log(archivo);
  }

  	
}
