import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grupo } from '../../interfaces/grupos';

const baseUrl:string = environment.base_url;
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http: HttpClient) {}

  consultarGrupos():Observable<Grupo[]>{
   return this.http.get<Grupo[]>(`${baseUrl}/grupos`,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        let listadoUser:Grupo[]=res;
        return listadoUser;
      })
    )
  }

  crearGrupo(grupo:Grupo):Observable<any>{
    return this.http.post(`${baseUrl}/grupos`,grupo,{
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  actaulizarGrupo(grupo:Grupo): Observable<any>{
    return this.http.put(`${baseUrl}/grupos`,grupo,{
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  eliminarGrupo(grupo:Grupo):Observable<any>{
    return this.http.delete(`${baseUrl}/grupos/${grupo.idGrupo}`,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }
}
