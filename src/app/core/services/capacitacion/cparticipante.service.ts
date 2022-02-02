import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Evento } from '../../interfaces/evento';

const baseUrl:string = environment.base_url;
const token:string = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class CparticipanteService {

  public eventos:Evento[]=[];
  ev:Evento={
    id: '',
    title: '',
    start: undefined,
    decription: '',
    editable: false
  }

  constructor(private http:HttpClient) { 
    
  }

  consultarEventos():Observable<Evento[]>{
    return this.http.get(`${baseUrl}/eventos`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map((res:any[])=>{
        this.eventos=[];
        res.forEach(el => {
          let fechafin:Date = el.fecha_Fin;
          this.ev={
            id:el.idEvento,
            title:el.titulo,
            start:el.fecha_Ini,
            end:this.addDays(new Date(fechafin),1),
            decription:el.descripcion,
            editable:true,
            classNames:['color-gris', el.colorEvento],
            allDay:el.todoElDia,
          }
          this.eventos.push(this.ev);
        });
        return this.eventos;
      })
    )
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

}
