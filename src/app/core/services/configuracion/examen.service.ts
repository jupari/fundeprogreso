import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Examen, ExamenBD } from '../../interfaces/examen';

const baseUrl = environment.base_url;
const token   = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(private http:HttpClient) { }

  private _examenes:Examen[];


  get examenes(){
    return this._examenes;
  }
  
  consultar():Observable<Examen[]>{

    return this.http.get<Examen[]>(`${baseUrl}/examen`,{
      headers:{
          'Authorization':`Bearer ${token}`
      }
    }).pipe(
      map(res => {
          this._examenes=res;
          return this._examenes;
        })
      )
  }

  consultarId(idExamen:number):Observable<Examen>{
    return this.http.get<Examen>(`${baseUrl}/examen/${idExamen}`,{
      headers:{
          'Authorization':`Bearer ${token}`
      }
    }).pipe(
      map(res => {
          return res;
        })
      )
  }

  crear(examen:ExamenBD):Observable<any>{
    return this.http.post<any>(`${baseUrl}/examen/`,examen,{
      headers:{
          'Authorization':`Bearer ${token}`
      }
    }).pipe(
      map(res => {
          return res;
        })
      )

  }

  editar(examen:ExamenBD):Observable<ExamenBD>{
    return this.http.put<ExamenBD>(`${baseUrl}/examen`,examen,{
      headers:{
          'Authorization':`Bearer ${token}`
      }
    }).pipe(
      map(res => {
          return res;
        })
      )
  }

  eliminar(idexamen:number):Observable<string>{
    return this.http.delete(`${baseUrl}/examen/${idexamen}`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }).pipe(
      map(res => {
          return JSON.stringify(res);
        })
      )

  }
}
