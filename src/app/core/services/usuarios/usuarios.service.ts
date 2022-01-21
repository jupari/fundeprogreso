import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../../interfaces/usuarios';

const baseUrl:string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) {}

  consultarUsuarios():Observable<Usuarios[]>{
    const token = localStorage.getItem('token');

    return this.http.get(`${baseUrl}/usuarios/users`,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      }).pipe(
        map(res=>{
          const listado = Object.values(res);
          let listadoUser:Usuarios[]=[];
          listado.forEach(el=>{
            const user:Usuarios = {
                NombreUsuario: el.nombreUsuario,
                Email:el.email,
                TipoRol:el.tiporol
            }
            listadoUser.push(user);
        })
        return listadoUser;
      })
    )
  }


}
