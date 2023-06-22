import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { LoginForm } from '../interfaces/login-form.interface';

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

  get headers(){
    return {
      'x-token': this.token
    }
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

  cargarUsuarios(desde:number){
    //http://localhost:3000/api/usuarios?desde=0
    const url=`${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url,{headers:this.headers})
                    .pipe(
                      map(resp =>{
                        // console.log(resp);
                        const usuarios= resp.usuarios.map(user=> new Usuario(user.nombre,user.email,'',user.role, user.img,user.google,user.uid))
                        return {
                          total:resp.total,
                          usuarios
                        }
                      })
                    )
  }

  eliminarUsuario(usuario:Usuario){
    //http://localhost:3000/api/usuarios/644ae3a4ab62ac419378a98b
    
    const url=`${base_url}/usuarios/${usuario.uid}`;
    // return console.log('eliminando');
    return this.http.delete(url,{headers:this.headers});
  }

  actualizarRole(usuario:Usuario){
    //http://localhost:3000/api/usuarios/644ade2562e3ecd60309ed57
    
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`,usuario, {
      headers:{
        'x-token':this.token
      }
    })

  }
   
}
