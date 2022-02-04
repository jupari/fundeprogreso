import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { CAdminService } from 'src/app/core/services/capacitacion/cadmin.service';
import { EventoBD } from 'src/app/core/interfaces/eventoBD';
import { EventoArchivoDisplay } from 'src/app/core/interfaces/eventosarchivos';
import { Evento } from 'src/app/core/interfaces/evento';
import { EventoMaterial } from 'src/app/core/interfaces/eventoMaterial';

@Component({
  selector: 'app-modalcapacitacion',
  templateUrl: './modalcapacitacion.component.html',
  styleUrls: ['./modalcapacitacion.component.css']
})
export class ModalcapacitacionComponent implements OnInit,OnChanges {

  @Input() eventoConsultar!:Evento;
  
  constructor(public modalService: ModalService
              ,private eventoService:CAdminService) { }


  ngOnChanges(changes: SimpleChanges): void {
     if(changes.eventoConsultar.currentValue){
      this.cargarEvento(changes.eventoConsultar.currentValue.event);
    }
  }

  evento:EventoMaterial={
    idCia: 0,
    idMunicipio: 0,
    titulo: '',
    descripcion: '',
    fecha_Ini: undefined,
    fecha_Fin: undefined,
    todoElDia: 0,
    colorEvento: '',
    imagen: '',
    nombreArchivo: '',
    link: '',
    activo: false,
    temas: []
  };  
  mostrarIconoImagenEvento:boolean=false;
  linkImagenEvento:string='';
  archivosGuardados:EventoArchivoDisplay[]=[];
  descripcion:string='';


  ngOnInit(): void {


  }


  cargarEvento(ev:any){
    const {  decription } = ev.extendedProps
    const start=new Date(ev.start).toISOString().substring(0, 10);
    const end =new Date(ev.end).toISOString().substring(0,10);

    //consumimos el servicio para editar el evento
    this.eventoService.consultarEventoxId(ev.id)
          .subscribe((res)=>{
            this.evento=res;
            this.descripcion=res.descripcion;
          })
    //Se consume el servicio para traer los archivos por temas 
    this.eventoService.consultarArchivoGuardadosxTema(ev.id)
          .subscribe(res=>{
            this.archivosGuardados=res;
          })
  }


  descargarArchivo(doc: any){
    const refArchivo = document.createElement('a');
    refArchivo.href=doc.archivo;
    refArchivo.setAttribute('download',doc.nombreArchivo);
    refArchivo.target='_blank';
    document.body.appendChild(refArchivo);
    refArchivo.click()
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }

  // groupBy:any = (array, key) => {
  //   // Return the end result
  //   return array.reduce((result, currentValue) => {
  //     // If an array already present for key, push it to the array. Else create an array and push the object
  //     (result[currentValue[key]] = result[currentValue[key]] || []).push(
  //       currentValue
  //     );
  //     // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
  //     return result;
  //   }, {}); // empty object is the initial value for result object
  // };

}
