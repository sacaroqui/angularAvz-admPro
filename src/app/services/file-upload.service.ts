import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  public base_url= environment.base_url;

  constructor(private http:HttpClient) { }

  actualizarArchivo(
    archivo:File,
    tipo:'usuarios'|'medicos'|'hospitales',
    id:string
  ){
    // http://localhost:3000/api/upload/medicos/6452cddd324f4304ab89671f
    const url= `${this.base_url}/upload/${tipo}/${id}`;
    const formData: FormData= new FormData();
    formData.append('imagen', archivo,archivo.name)

    return this.http.put(url, formData,{
      headers:{
        'x-token':localStorage.getItem('token') ||''
      }
    })
    
  }
}
