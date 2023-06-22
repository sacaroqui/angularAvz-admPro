import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {
  
  @ViewChild('inputFile') myInputVariable!: ElementRef;

  public imagen!:File;
  public imagenTemp:any=null;
  

  constructor(public modalImagenService:ModalImagenService,
              public fileUploadService:FileUploadService){

  }

  cerrarModal(){
    this.modalImagenService.cerrarModal();
    this.imagenTemp=null;
    this.myInputVariable.nativeElement.value = "";
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
    const tipo=this.modalImagenService.tipo;
    const uid=this.modalImagenService.id;
    console.log(tipo);
    console.log(uid);
    console.log(this.imagen);
    this.fileUploadService.actualizarArchivo(this.imagen,tipo,uid)
    .subscribe((resp:any)=>{
      Swal.fire('Guardado','La imagen se actualizo de manera correcta','success');
      this.modalImagenService.nuevaImagen.emit(resp);
    })
    this.cerrarModal();
    

  }

}
