import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Municipio } from '../../interfaces/municipio';

const baseUrl= environment.base_url;
const token = localStorage.getItem('token');


@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private _municipios:Municipio[]=[];
  private _municipio:Municipio;


  get Municipios(){
    return this._municipios;
  }

  get Municipio(){
    return this._municipio;
  }

  constructor(private http:HttpClient) { 
      this.consultarMunicipios()
          .subscribe(res=>this._municipios=res);
  }

  consultarMunicipios():Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${baseUrl}/municipio`).pipe(
      map(res=>{
        const municipiosres:Municipio[]=res;
        return municipiosres;
      })
    )
  }

  municipioxId(id:number):Observable<Municipio>{
    return this.http.get<Municipio>(`${baseUrl}/municipio/${id}`).pipe(
      map(res=>{
        return this._municipio=res;
      })
    )
  }

  crearMunicipio(municipio:Municipio):Observable<string>{
    return this.http.post(`${baseUrl}/municipio`,municipio,{
      headers:{
        'Authorization':`Bearer ${token}`
        }
      }).pipe(
        map(res=>{
          return JSON.stringify(res);
        })
      )
  }

  EditarMunicipio(municipio:Municipio):Observable<string>{
    return this.http.put(`${baseUrl}/municipio`,municipio,{
      headers:{
        'Authorization':`Bearer ${token}`
        }
      }).pipe(
        map(res=>{
          return JSON.stringify(res);
        })
      )
  }

  eliminarMunicipio(id:number):Observable<string>{
    return this.http.delete(`${baseUrl}/municipio/${id}`,{
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
