import { Component, OnInit } from '@angular/core';
import { Grupo } from 'src/app/core/interfaces/grupos';
import { ModalDescargaArchivoService } from 'src/app/core/services/componentes/modal-descargaarchivos.service';
import { GrupoService } from 'src/app/core/services/grupos/grupos.service';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.css']
})
export class DeployComponent implements OnInit {

  constructor(private modalDescargaArchivo: ModalDescargaArchivoService,
              private grupoService:GrupoService) { 

  }


  grupoEnviar:Grupo={
    idGrupo: 0,
    orden: 0,
    nombre_Grupo: '',
    descripcion: '',
    icono: '',
    claseCSS: '',
    activo: false
  };
  gruposListado!:Grupo[];


  grupo1!:Grupo[];
  grupo2!:Grupo[];
  grupo3!:Grupo[];
  grupo4!:Grupo[];
  grupo5!:Grupo[];
  grupo6!:Grupo[];

  filas:number[]=[1,2,3,4,5,6];

  ngOnInit(): void {
    this.consultarGrupos();
   
  }

  descarArchivo(ev:Grupo){
    this.grupoEnviar=ev;
    this.modalDescargaArchivo.abrirModal();
  }

  segmentarGrupos(){}
  consultarGrupos(){
    this.grupoService.consultarGrupos()
          .subscribe(res=>{
            this.gruposListado=res;
            this.filas.forEach(el => {
              if (el==1){
                this.grupo1= [...this.gruposListado].splice(0,3);
              }
              if(el==2){
                this.grupo2 = [...this.gruposListado].splice(3,3);
              }
              if(el==3){
                this.grupo3 = [...this.gruposListado].splice(6,3);
              }
              if(el==4){
                this.grupo4 = [...this.gruposListado].splice(9,3);
              }
              if(el==5){
                this.grupo4 = [...this.gruposListado].splice(12,3);
              }
              if(el==6){
                this.grupo4 = [...this.gruposListado].splice(15,3);
              }
            });
          })
  }

}
