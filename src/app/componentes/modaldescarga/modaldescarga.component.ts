import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalDescargaArchivoService } from 'src/app/core/services/componentes/modal-descargaarchivos.service';
import { iMunicipios, Municipios } from 'src/app/core/mocks/municipios';
import { DocumentosService } from 'src/app/core/services/documentos/documentos.service';
import { Documento } from 'src/app/core/interfaces/documento';
import { Grupo } from 'src/app/core/interfaces/grupos';

interface filtroDocs{
  NomMunicipio:string;
  IdGrupo:string;
}

@Component({
  selector: 'app-modaldescarga',
  templateUrl: './modaldescarga.component.html',
  styleUrls: ['./modaldescarga.component.css']
})
export class ModaldescargaComponent implements OnInit,OnChanges {

  constructor(public modaDescargaArchivoS: ModalDescargaArchivoService,
              private documentoService:DocumentosService) { }
 
  termino:string='';
  MunicipiosSugeridos:iMunicipios[] = []; 
  mostrarSugerencia:boolean=false;
  mostrarResultados:boolean=false
  listadoDocumentos:Documento[]=[];

  @Input() grupo:Grupo = {
    idGrupo: 0,
    orden: 0,
    nombre_Grupo: '',
    descripcion: '',
    icono: '',
    claseCSS: '',
    activo: false
  };

  ngOnInit(): void {
    
  }

  

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  cerrarModal(){
    this.limpiar();
    this.modaDescargaArchivoS.cerrarModal()

  }

  limpiar(){
    this.termino='';
    this.listadoDocumentos=[]
    this.mostrarResultados=false;
  }

  buscar(termino:string){
    this.mostrarSugerencia=false;
    this.mostrarResultados=true
    this.termino=termino;
    this.traerDocumentoFiltro();
   
    
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

  traerDocumentoFiltro(){
    const filtro:filtroDocs={
      NomMunicipio: this.termino,
      IdGrupo: this.grupo.idGrupo.toString()
    };

    this.documentoService.documentosPublicos(filtro)
          .subscribe(res=>{
            if(res){
              this.listadoDocumentos=res;
            }else{
              this.listadoDocumentos=[]
            }
            
          })
  }

  descargarArchivo(doc: Documento){
    const refArchivo = document.createElement('a');
    refArchivo.href=doc.archivo;
    refArchivo.setAttribute('download',doc.nombreArchivo);
    refArchivo.target='_blank';
    document.body.appendChild(refArchivo);
    refArchivo.click()
  }

}
