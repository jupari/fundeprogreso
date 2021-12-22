import { Component, OnInit } from '@angular/core';
import { ModalGrupoService } from 'src/app/core/services/componentes/modal-grupo.service';

@Component({
  selector: 'app-modalgrupos',
  templateUrl: './modal-grupos.component.html',
  styleUrls: ['./modal-grupos.component.css']
})
export class ModalGruposComponent implements OnInit {


  constructor(public smodalgrupo: ModalGrupoService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.smodalgrupo.cerrarModal() 
  }



}
