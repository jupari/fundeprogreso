import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ModalService } from 'src/app/core/services/componentes/modal.service';

import dayGridPlugin  from '@fullcalendar/daygrid';
import timeGridPlugin  from '@fullcalendar/timegrid';
import interationPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import Tooltip from 'tooltip';
import { CparticipanteService } from 'src/app/core/services/capacitacion/cparticipante.service';
import { Evento } from 'src/app/core/interfaces/evento';




declare function calendarinit():any;

@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html',
  styleUrls: ['./capacitacion.component.css']
})
export class CapacitacionComponent implements OnInit {

  // eventos:any[] = [
  //   {
  //     title:'Evento 1',
  //     start:new Date(),
  //     decription:'Evento Programado por la secretaria de educación',
  //     display:'block',
  //     editable:true,
  //     classNames:['color-gris','bg-warning'],
  //     url:[],

  //   },
  //   {
  //     title:'Evento 2',
  //     //start:new Date(new Date().getTime()+ 86400000),
  //     start:new Date(),
  //     decription:'Evento Programado por la secretaria de educación',
  //     editable:true,
  //     classNames:['bg-success','color-gris'],
  //     display:'block'
  //   },
  //   {
  //     title:'Evento 3',
  //     start:new Date(new Date().getTime()+ (86400000*2)),
  //     decription:'Evento Programado por la secretaria de educación',
  //     editable:true,
  //     classNames:['color-gris'],
  //   }
  // ]

  eventos:Evento[]=[];

  optionsCalendario={};

  constructor(  public modalService: ModalService
                ,public cparticipante:CparticipanteService) { }

  @ViewChild('calendario') calendar!: ElementRef;

  ngOnInit(): void {
    //calendarinit();

    this.cparticipante.consultarEventos()
          .subscribe(res=>{
            this.eventos = [...res];
          })
   
    this.escribirEventos()      

    setTimeout(() => {
           
    }, 2000);
  }

  escribirEventos(){
   

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
      dateClick: this.onDateClick.bind(this),
      events:this.eventos,
      eventClick:(calEvent:any, jsEvent:any, view:any)=>{
        console.log(calEvent);
        this.modalService.abrirModal()
      },
      eventDidMount: (info)=>{
        console.log('hola ',info);
        var tooltip = new Tooltip(info.el, {
          title: info.event.extendedProps.description,
          placement: 'top',
          trigger: 'hover',
          container: 'body'
        });
      },
    }
  }

  onDateClick(res:any){
    console.log(res)
    this.modalService.abrirModal()
  }

  eventclic(){
    console.log('llegue')
    this.modalService.abrirModal()
  }

  updateEvent(ev:any){
    console.log(ev)
  }

  clickButton(ev:any){
    console.log(ev)

  }

}
