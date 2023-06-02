import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  public usuario!:Usuario;
  
  constructor(private usuarioService:UsuarioService){
    this.usuario=usuarioService.usuario;
    // this.nombre=usuarioService.usuario.nombre;
    // this.email=usuarioService.usuario.email;
    
    // console.log(this.imgUrl);
  }

  logout(){
    this.usuarioService.logout();
  }

}
