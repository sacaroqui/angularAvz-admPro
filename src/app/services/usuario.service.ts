import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap} from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';


declare const google:any;
const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  public usuario!: Usuario;
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

  actualizarPerfil(data:{nombre:string,email:string,role:string}){
    //http://localhost:3000/api/usuarios/644ade2562e3ecd60309ed57
    data={
      ...data,
      role:this.usuario.role!
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`,data , {
      headers:{
        'x-token':this.token
      }
    })

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

  get token(){
    return localStorage.getItem('token') || '';
  }

  get uid (){
    return this.usuario.uid;
  }

  validarToken():Observable<boolean>{
    // const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token': this.token
      }
    }).pipe(
      map((resp:any)=>{
        // console.log(resp);
        const {email,google,img,nombre,role,uid}=resp.usuario;
        this.usuario= new Usuario(nombre,email,'',role,img,google,uid);
        // console.log(this.usuario);
        localStorage.setItem('token',resp.jwt)
        return true
      }),
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
