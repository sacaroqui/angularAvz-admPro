import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap} from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


declare const google:any;
const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {

  constructor(private http:HttpClient,
              private router:Router) { }

  crearUsuario(formData:RegisterForm){
    return this.http.post(`${base_url}/usuarios`,formData)
                    .pipe(
                      tap((resp:any)=>{
                        localStorage.setItem('token',resp.jwt);
                      })
                     )
  }

  loginUsuario(formData: LoginForm){
    
    return this.http.post(`${base_url}/login`,formData)
               .pipe(
                tap((resp:any)=>{
                  localStorage.setItem('token',resp.jwt);
                })
               )
  }

  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token})
                    .pipe(
                      tap((resp:any)=>{
                        localStorage.setItem('token',resp.jwt);
                      })
                     )
  }

  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token': token
      }
    }).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.jwt)
      }),
      map(resp=>true),
      catchError(error=>of(false))
    )
  }

  logout(){
    localStorage.removeItem('token');
    google.accounts.id.revoke('sacariqui@gmail.com',()=>{
      this.router.navigateByUrl('/login');

    })

  }
   
}
