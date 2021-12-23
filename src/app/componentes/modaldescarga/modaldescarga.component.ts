import { Component, OnInit } from '@angular/core';
import { ModalDescargaArchivoService } from 'src/app/core/services/componentes/modal-descargaarchivos.service';
import { iMunicipios, Municipios } from 'src/app/core/mocks/municipios';



@Component({
  selector: 'app-modaldescarga',
  templateUrl: './modaldescarga.component.html',
  styleUrls: ['./modaldescarga.component.css']
})
export class ModaldescargaComponent implements OnInit {

  constructor(public modaDescargaArchivoS: ModalDescargaArchivoService) { }
  termino:string='';
  MunicipiosSugeridos:iMunicipios[] = []; 
  mostrarSugerencia:boolean=false;
  mostrarResultados:boolean=false

  ngOnInit(): void {
    
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
