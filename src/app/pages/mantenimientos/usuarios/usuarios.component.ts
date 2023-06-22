import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public total:number=0;
  public usuarios:Usuario[]=[];
  public usuariosTemp:Usuario[]=[];
  public paginaDesde=0;
  public cargando=true;

  public imgSubscri!:Subscription;

  constructor(private usuarioService:UsuarioService,
              private busquedasService:BusquedasService,
              private modalImagenService:ModalImagenService){
  }
  ngOnDestroy(): void {
    this.imgSubscri.unsubscribe();
  }

  ngOnInit(): void {
    this.mostrarUsuarios();
    this.imgSubscri=this.modalImagenService.nuevaImagen.subscribe(img=>{
      this.mostrarUsuarios()
    })
  }

  mostrarUsuarios(){
    this.cargando=true;
    this.usuarioService.cargarUsuarios(this.paginaDesde)
        .subscribe(({total,usuarios})=>{
          this.total=total;
          this.usuarios=usuarios;
          this.usuariosTemp=usuarios;
          this.cargando=false;
    })
  }

  cambiarPagina(valor:number){
    this.paginaDesde += valor;
    if(this.paginaDesde<0){
      this.paginaDesde=0;
    }else if (this.paginaDesde >= this.total){
      this.paginaDesde -= valor;
    }
      this.mostrarUsuarios();
  }

  buscarUsuarios(termino:string){
    // console.log(termino);
    if(termino.length === 0){
      this.usuarios=[...this.usuariosTemp];
      return 
    }
 
    this.busquedasService.buscar('usuarios',termino)
        .subscribe(usuarios=>{
          this.usuarios=usuarios;
        })
  }

  eliminarUsuario(usuario:Usuario){
    // console.log(usuario);
    console.log(this.usuarioService.uid);
    if(usuario.uid === this.usuarioService.uid){
      Swal.fire('Error', 'No se puede eliminar usted mismo', 'error')
      return;
    }
  
    Swal.fire({
      title: '¿Quieres Eliminar un Usario?',
      text: `Eliminaras al usuario ${usuario.nombre}` ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
       this.usuarioService.eliminarUsuario(usuario)
           .subscribe(resp=>{
            this.mostrarUsuarios();
            Swal.fire(
              'Eliminado!',
              `El usuario ${usuario.nombre} a sido eliminado`,
              'success'
            )
           })
      }
    })
  }

  actualizarRole(usuario:Usuario){
    console.log(usuario);
    this.usuarioService.actualizarRole(usuario)
        .subscribe(resp=>{
          console.log(resp);
        })
  }

  abrirModal(usuario:Usuario){
    console.log(usuario);
    const id=usuario.uid || '';
    const img=usuario.img || 'no-img';
    this.modalImagenService.abrirModal('usuarios',id,img);
  }
  

}
