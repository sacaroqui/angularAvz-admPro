import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  menu:any[]=[]
  public usuario!:Usuario;
  // public imgUrl='';
  // public nombre='';
  // public email= '';
  constructor(private sidebarService:SidebarService,
              private usuarioService:UsuarioService){
    this.menu=sidebarService.menu;
    this.usuario=usuarioService.usuario;
    // console.log(this.menu);
    // this.imgUrl=usuarioService.usuario.imagenUrl;
    // this.nombre=usuarioService.usuario.nombre;
    // this.email=usuarioService.usuario.email;
  }
  

  logout(){
    this.usuarioService.logout();
  }
  
}
