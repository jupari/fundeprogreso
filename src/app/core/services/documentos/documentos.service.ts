import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Documento } from '../../interfaces/documento';
import { Iarchivo } from '../../interfaces/iarchivo';

const baseUrl = environment.base_url;
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor(private http: HttpClient) { }


  consultarDocs():Observable<Documento[]>{
    return this.http.get<Documento[]>(`${baseUrl}/documentos`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        let listadoDocs:Documento[]=res;
        return listadoDocs;
      })
    )

  }

  crearDocs(doc:Documento):Observable<any>{
    return this.http.post(`${baseUrl}/documentos`,doc,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  //editarDocs(doc:Documento):Observable<any>{}

  eliminarDocs(doc:Documento):Observable<any>{
    return this.http.delete(`${baseUrl}/documentos/${doc.idDocumento}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }  

  //se contruye y sube el archivo para extraer la ruta
  async uploadArchivo(archivo:Iarchivo){
    try {
      const url = `${baseUrl}/documentos/uploadarchivo`;
      const formData= new FormData();
      formData.append('grupo',archivo.grupo);
      formData.append('municipio',archivo.municipio);
      formData.append('titulo',archivo.municipio);
      formData.append('file',archivo.file);

      const resp = await fetch( url, {
        method:'POST',
        headers:{
          'Authorization': `Bearer ${token}`
        },
        body:formData
      } );

      const data = await resp.json();
      return data;

    } catch (error) {
      console.log(error);
      return false;
      
    }
  }

 
}
