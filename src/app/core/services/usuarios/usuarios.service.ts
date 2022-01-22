import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearUsuario, Usuarios } from '../../interfaces/usuarios';

const baseUrl:string = environment.base_url;
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) {}

  consultarUsuarios():Observable<Usuarios[]>{
    

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
                NombreCompleto:el.nombreCompleto,
                Email:el.email,
                TipoRol:el.tiporol,
                activo:el.activo
            }
            listadoUser.push(user);
          })
          return listadoUser;
      })
    )
  }

  crearUsuario(user:CrearUsuario):Observable<any>{
    return this.http.post(`${baseUrl}/usuarios/registro`,user,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  editarUsuario(user:CrearUsuario):Observable<any>{
    return this.http.put(`${baseUrl}/usuarios/actualizar`,user,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

   /* Validacion del email revisar que no este creado */
   validarEmail(email:string):Observable<any>{
    return this.http.get(`${ baseUrl }/perfiles/usuarios/validatoremail/${email}`,{
        headers:{
           'Content-Type': 'application/json'
        }
    }).pipe(
        map(res=>{
            return JSON.stringify(res);
        })
    )
}

}
