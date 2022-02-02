import { Component, OnInit } from '@angular/core';
import { Municipio } from 'src/app/core/interfaces/municipio';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { MunicipioService } from 'src/app/core/services/configuracion/municipio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.css']
})
export class MunicipioComponent implements OnInit {

  municipios:Municipio[]=[];
  municipio:Municipio;
  constructor(public modalService:ModalService
              ,public municipioService:MunicipioService) { }

  ngOnInit(): void {
    this.consultarMunicipios();
  }

  consultarMunicipios(){
    this.municipioService.consultarMunicipios()
        .subscribe(res=>this.municipios=res);
  }

  editarMunicipio(ev:Municipio){
    this.municipio=ev;
    this.modalService.abrirModal();
  }



  eliminarMunicipio(ev:Municipio){
    Swal.fire({
      title: '¿Borrar Municipio?',
      text: `Esta seguro de Borrar este Municipio ${ev.nombre} `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.municipioService.eliminarMunicipio(ev.idMunicipio)
        .subscribe(res=>{
          Swal.fire(
            'Información',
            `El municipio ${ev.nombre} se borró con éxito.`,
            'success');
            this.consultarMunicipios();
        })       
      }
    })

  }

  actualizar(ev:boolean){
    if(ev){
      this.consultarMunicipios();
    }

  }

  abrirModal(){
    this.modalService.abrirModal();
  }

 
}
