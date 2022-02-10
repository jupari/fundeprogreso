import { Component, OnInit } from '@angular/core';
import { MensajeDisplay, MmMensaje } from 'src/app/core/interfaces/mensaje';
import { MensajesService } from 'src/app/core/services/mensajes/mensajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  constructor(private mensajeService:MensajesService) { }

  mensajes:MensajeDisplay[]=[];

  ngOnInit(): void {
    this.consultarMensajes();
  }

  consultarMensajes(){
    this.mensajeService.consultarMensajes()
    .subscribe(res=>{
      this.mensajes=res;
    })
  }

  eliminar(ev:MensajeDisplay){
    if(ev){
        Swal.fire({
          title: '¿Borrar Grupo?',
          text: `Esta seguro de Borrar el mensaje de ${ev.nombre}`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Borrar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.mensajeService.borrarMensaje(ev.idMensaje)
            .subscribe(res=>{
              if(res){
                this.consultarMensajes();
                Swal.fire(
                  'Información',
                  `El menasaje ${ev.nombre} se borró con éxito.`,
                  'success');
              }
            })       
          }
        })
    }
  }

}
