import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  menu:any[]=[]
  constructor(private sidebarService:SidebarService,
              private usuarioService:UsuarioService){
    this.menu=sidebarService.menu;
    // console.log(this.menu);
  }
  

  logout(){
    this.usuarioService.logout();
  }
  
}
