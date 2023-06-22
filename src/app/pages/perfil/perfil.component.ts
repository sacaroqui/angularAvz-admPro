import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public perfilForm!:FormGroup;
  public usuario:Usuario;
  public imagen!:File;
  public noCambioEmail=false;
  public imagenTemp:any=null;
  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private fileUploadService:FileUploadService){
    this.usuario=usuarioService.usuario;        
              
  }

  ngOnInit(): void {
    this.perfilForm= this.fb.group({
      nombre:[this.usuario.nombre, Validators.required],
      email:[this.usuario.email,[Validators.required, Validators.email]]
    })
  }

  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
        .subscribe(resp=>{
          const {nombre,email}=this.perfilForm.value;
          this.usuario.nombre=nombre;
          this.usuario.email=email;
          Swal.fire('Guardado','Los Datos se actualizaron','success')
        },(err)=>{
          console.log(err.error.msg);
          Swal.fire('Error', err.error.msg,'error')
        })
  }

  cargarArchivo(file:File){
    this.imagen = file;
    if(!this.imagen){
      this.imagenTemp=null;
      return
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.imagen);
    reader.onloadend=()=>{
     this.imagenTemp=reader.result;
    }
   
  }

  ActualizarFoto(){
    this.fileUploadService.actualizarArchivo(this.imagen,'usuarios',this.usuario.uid!)
    .subscribe((resp:any)=>{
      const{nombreArchivo}=resp;
      this.usuario.img=nombreArchivo;
      Swal.fire('Guardado','La imagen se actualizo de manera correcta','success')
    })
      
    

  }

}
