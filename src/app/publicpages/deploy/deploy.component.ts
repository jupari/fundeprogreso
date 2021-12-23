import { Component, OnInit } from '@angular/core';
import { ModalDescargaArchivoService } from 'src/app/core/services/componentes/modal-descargaarchivos.service';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.css']
})
export class DeployComponent implements OnInit {

  constructor(private modalDescargaArchivo: ModalDescargaArchivoService) { 

  }

  

  ngOnInit(): void {
  }

  descarArchivo(ev:any){
    this.modalDescargaArchivo.abrirModal();
  }

}
