import { Component, OnInit, Output,EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Municipio } from 'src/app/core/interfaces/municipio';
import { MunicipioService } from 'src/app/core/services/configuracion/municipio.service';


@Component({
  selector: 'app-buscar-mcipios',
  templateUrl: './buscar-mcipios.component.html',
  styleUrls: ['./buscar-mcipios.component.css']
})
export class BuscarMcipiosComponent implements OnInit,OnChanges {

  @Output() terminoSeleccionado:EventEmitter<string> = new EventEmitter();
  @Output() idMunicipioSeleccionado:EventEmitter<number> = new EventEmitter();
  @Input() actualizar:boolean=false;

    
  termino:string='';

  debounce: Subject<string> = new Subject();
  
  mostrarSugerencia:boolean=false;
  MunicipiosSugeridos:Municipio[];

  constructor(private municipiosService:MunicipioService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.actualizar.currentValue){
      this.termino='';
    }
  }

  ngOnInit() {

    this.debounce
      .pipe(
        debounceTime(300)
      )
      .subscribe(valor => {
        this.terminoSeleccionado.emit(valor);
        this.buscar();
      })
  }

 
  teclaPrecionada(){
    this.debounce.next( this.termino );
  }


  buscar(){
    this.mostrarSugerencia=true;
    this.BuscarMcipio(this.termino);
  }

 
  BuscarMcipio(termino:string){
    this.mostrarSugerencia=true;
    if (termino==''){
      this.mostrarSugerencia=false;
      this.MunicipiosSugeridos=[];
    }else{
      this.consultarMunicipios(); 
    }
  }

  consultarMunicipios(){
    this.municipiosService.consultarMunicipios()
        .subscribe(res=>{
          this.MunicipiosSugeridos=res.filter(valor=>
                valor.nombre.toLocaleLowerCase().includes(this.termino.toLocaleLowerCase())).splice(0,7);
        })
  }

  seleccionar(municipio:Municipio){
    if(municipio){
      this.mostrarSugerencia=false;
      this.termino = municipio.nombre;
      this.terminoSeleccionado.emit(this.termino);
      this.idMunicipioSeleccionado.emit(municipio.idMunicipio) 
    }
  }

 
}
