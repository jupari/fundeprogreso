import { Component, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { Grupo } from 'src/app/core/interfaces/grupos';
import { ModalGrupoService } from 'src/app/core/services/componentes/modal-grupo.service';
import { GrupoService } from 'src/app/core/services/grupos/grupos.service';



@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  grupos: Grupo[]=[]


  @ViewChild('table') table:any;

  constructor(private smodalgrupo:ModalGrupoService,
              public grupoService: GrupoService) { }

  ngOnInit(): void {
    this.grupoService.consultarGrupos().subscribe(res=>{
      this.grupos=res;
    })
  }

  mostrarModal(){
    this.smodalgrupo.abrirModal();
  }

  actualizarGrupo(grupo:Grupo){
    this.grupos.push(grupo);
    console.log(this.grupos);
  }
}
