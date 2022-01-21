import { Component, OnInit, Output,EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-buscar-mcipios',
  templateUrl: './buscar-mcipios.component.html',
  styleUrls: ['./buscar-mcipios.component.css']
})
export class BuscarMcipiosComponent implements OnInit,OnChanges {

  @Output() onEnter:  EventEmitter<string> = new EventEmitter();
  @Output() ondebounce: EventEmitter<string> = new EventEmitter();

  @Input() termino:string='';

  debounce: Subject<string> = new Subject();
  


  constructor() { }

  ngOnInit() {

    this.debounce
      .pipe(
        debounceTime(300)
      )
      .subscribe(valor => {
      this.ondebounce.emit(valor);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    //si el termino viene vacion se limpia el control...
   if(changes.termino.currentValue==""){
     this.termino='';
   } 
  }

  buscar(){
    this.onEnter.emit( this.termino);
  }

  teclaPrecionada(){
    this.debounce.next( this.termino );
  }

}
