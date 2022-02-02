import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/componentes/modal.service';

@Component({
  selector: 'app-modalcapacitacion',
  templateUrl: './modalcapacitacion.component.html',
  styleUrls: ['./modalcapacitacion.component.css']
})
export class ModalcapacitacionComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }


}
