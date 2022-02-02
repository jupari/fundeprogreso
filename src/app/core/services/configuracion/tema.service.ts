import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Tema } from '../../interfaces/temas';

const baseUrl= environment.base_url;
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private _temas:Tema[]=[]
  private _tema:Tema;

  get Temas(){
    return this._temas
  }

  get Tema(){
    return this._tema;
  }

  constructor(private http:HttpClient) { }

  consultarTemas():Observable<Tema[]>{
    return this.http.get<Tema[]>(`${baseUrl}/temas`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  crearTema(tema:Tema):Observable<Tema>{
    return this.http.post<Tema>(`${baseUrl}/temas`,tema,{
      headers:{
        'Authorization':`Bearer ${token}`
        }
      }).pipe(
        map(res=>{
          return this._tema=res;
        })
      )
  }

  editarTema(tema:Tema):Observable<string>{
    return this.http.put(`${baseUrl}/temas`,tema,{
      headers:{
        'Authorization':`Bearer ${token}`
        }
      }).pipe(
        map(res=>{
          return JSON.stringify(res);
        })
      )
  }

  eliminarTema(id:number):Observable<string>{
    return this.http.delete(`${baseUrl}/temas/${id}`,{
      headers:{
        'Authorization':`Bearer ${token}`
        }
      }).pipe(
        map(res=>{
          return JSON.stringify(res);
        })
      )
  }
}
