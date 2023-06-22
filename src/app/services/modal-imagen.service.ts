import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal:boolean=true;
  public tipo!:'usuarios'|'medicos'|'hospitales';
  public id!:string;
  public img!:string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>()

  get ocultarModal(){
    return this._ocultarModal;
  }

  constructor() { }

  abrirModal(tipo:'usuarios'|'medicos'|'hospitales', id:string,imagen:string){
    // http://localhost:3000/api/upload/usuarios/815091e2-c718-42f4-85f1-c5bbee51c983.jpg
    this._ocultarModal=false;
    this.tipo=tipo;
    this.img=imagen;
    this.id=id;
    console.log(this.id);
    if(imagen.includes('https')){
      this.img=imagen;
    }else{
      this.img=`${base_url}/upload/${tipo}/${imagen}`;
    }
    
    
    
  }

  cerrarModal(){
    this._ocultarModal=true;
  }
}
