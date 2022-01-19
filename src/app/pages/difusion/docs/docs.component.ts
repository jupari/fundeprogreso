import { Component, OnInit } from '@angular/core';
import { ModalDocService } from 'src/app/core/services/componentes/modal-doc.service';

declare function dropzone():any;

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {

  constructor(private smodalDocService: ModalDocService) { }

  ngOnInit(): void {
    dropzone();
  }

  mostrarModal(){
    this.smodalDocService.abrirModal();
  }

}
