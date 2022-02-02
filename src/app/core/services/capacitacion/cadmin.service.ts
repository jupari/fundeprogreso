import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Evento } from '../../interfaces/evento';
import { EventoBD } from '../../interfaces/eventoBD';

const baseUrl:string = environment.base_url;
const token:string = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class CAdminService {

  private _eventos:Evento[]=[];

  get eventos():Evento[]{
    return this._eventos;
  }

  

  ev:Evento={
    id: '',
    title: '',
    start: undefined,
    decription: '',
    editable: false
  }

  constructor(private http:HttpClient) { 
    this.consultarEventos()
    .subscribe(res=>{
      this._eventos=res;
      return this._eventos
    });
  }

  consultarEventos():Observable<Evento[]>{
    return this.http.get(`${baseUrl}/eventos`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map((res:any[])=>{
        this._eventos=[];
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

  guardarEvento(data:EventoBD):Observable<EventoBD>{
    console.log(data);
    return this.http.post<EventoBD>(`${baseUrl}/eventos`,data,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res
      })
    )
  }

  EditarEvento(data:EventoBD):Observable<EventoBD>{
    console.log(data);
    return this.http.put<EventoBD>(`${baseUrl}/eventos`,data,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res
      })
    )
  }

  eliminarEvento(idEvento: number):Observable<string>{
    return this.http.delete(`${baseUrl}/eventos/${idEvento}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return JSON.stringify(res);
      })
    )
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

}
