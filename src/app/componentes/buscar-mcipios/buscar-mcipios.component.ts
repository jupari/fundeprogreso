import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-buscar-mcipios',
  templateUrl: './buscar-mcipios.component.html',
  styleUrls: ['./buscar-mcipios.component.css']
})
export class BuscarMcipiosComponent implements OnInit {

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

  buscar(){
    this.onEnter.emit( this.termino);
  }

  teclaPrecionada(){
    this.debounce.next( this.termino );
  }

}
