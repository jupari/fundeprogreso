import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import dayGridPlugin  from '@fullcalendar/daygrid';
import timeGridPlugin  from '@fullcalendar/timegrid';
import interationPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { CAdminService } from 'src/app/core/services/capacitacion/cadmin.service';
import { Evento } from 'src/app/core/interfaces/evento';
import Swal from 'sweetalert2';
import moment from 'moment';
import $ from 'jQuery';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-capacitacion-admin',
  templateUrl: './capacitacion-admin.component.html',
  styleUrls: ['./capacitacion-admin.component.css']
})
export class CapacitacionAdminComponent implements OnInit {

  eventos:any[]=[];
  optionsCalendario={};
  contador:number=0
  idMunicipio:number=0

  @ViewChild('calendario') calendario:ElementRef;

  calEvent:ElementRef;
  constructor(public modalService:ModalService
              ,public cadmin:CAdminService
              ,public authService:AuthService) { }

  ngOnInit(): void {
    this.consultarEventos();
    this.opcionesCalendario();
    setTimeout(() => {
      this.clickNext();  
    }, 2000);

    
    
  }
  

  opcionesCalendario(){
    this.optionsCalendario={
      plugins: [interationPlugin,dayGridPlugin,timeGridPlugin],
      themeSystem: 'bootstrap',
      initialView: 'dayGridMonth',
      locale: esLocale,
      defaultDate: new Date(),
      header:{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable:true,
      eventMouseover:function(event,jsEvent,view){
              var str = "Nombre de la tarea:" + event.title + "\ nHora de inicio:" + moment(event.start_time) + "\ nHora de finalización:" + moment(event.end_time) + "\ nDescripción de la tarea:" + event.task_desc + "\ nIniciador:" + event.create_name + "\ nProcessor:" + event.do_name;
              $(this).attr('title',str);
              $(this).css('font-weight','normal');
      },
      dateClick: this.onDateClick.bind(this),
      events:this.cadmin.eventos,
      eventClick:(calEvent:any, jsEvent:any, view:any)=>{
        this.calEvent=calEvent;
        this.idMunicipio=this.authService.perfil.idMunicipio
        this.modalService.abrirModal()
      }
    }
  }

  consultarEventos(){
    this.cadmin.consultarEventos()
          .subscribe(res=>{
              this.eventos=[...res];
          })
  }

  clickNext(){
    //var botonNext= document.querySelector('.fc-next-button');
   
    //botonNext.addEventListener('click',this.evento)
  }

  eliminarEventos(ev:Evento){

    const idEvento:number= +ev.id;

    this.cadmin.eliminarEvento(idEvento)
          .subscribe(res=>{
            Swal.fire('Información',res+'título '+ ev.title,'success');
            this.consultarEventos();
          })
  }


  onDateClick(ev:any){
    //console.log(ev);
  }
  updateEvent(ev:any){}
  clickButton(ev:any){}

}
