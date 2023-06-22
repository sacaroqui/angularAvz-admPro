import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url=environment.base_url

@Injectable({
  providedIn: 'root'
})

export class BusquedasService {

  constructor(private http:HttpClient) { }
  
  get token(){
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      'x-token': this.token
    }
  }

  private transformarUsuarios(respuesta:any[]):Usuario[]{
    return respuesta.map(user => new Usuario(user.nombre,user.email,'',user.role, user.img,user.google,user.uid));
  }

  buscar(tipo:'usuarios'|'medicos'|'hospitales', termino:string){
    //http://localhost:3000/api/todo/coleccion/usuarios/t
    const url=`${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url,{headers:this.headers})
               .pipe(
                map((resp:any)=>{
                  switch (tipo) {
                    case 'usuarios':
                      return this.transformarUsuarios(resp.respuesta);
                    default:
                      return [];
                  }
                  
                })
               )

  }
}
