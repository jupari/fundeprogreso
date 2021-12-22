import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalGrupoService } from 'src/app/core/services/componentes/modal-grupo.service';


@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  @ViewChild('table') table:any;

  constructor(private smodalgrupo:ModalGrupoService) { }

  ngOnInit(): void {
  
  }

  mostrarModal(){
    this.smodalgrupo.abrirModal();
  }

}
