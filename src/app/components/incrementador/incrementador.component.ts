import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  ngOnInit() {
    this.btnClass=`btn ${this.btnClass} h-100`
  }

  @Input('valor') progreso:number=50;
  @Input() btnClass:string='btn-primary'

  @Output('valor') nuevoProgreso: EventEmitter <number> = new EventEmitter();


  cambiarValor(valor:number){
    this.progreso=this.progreso+valor;
    this.nuevoProgreso.emit(this.progreso);
    if(this.progreso>100){
      this.progreso=100;
      this.nuevoProgreso.emit(this.progreso);
      return
    }
    if(this.progreso<0){
      this.progreso=0;
      this.nuevoProgreso.emit(this.progreso);
      return
    } 
  }

  onChange(valor:number){
    if(valor>100){
      return
    }else{
      if(valor < 0){
        return
      }else{
        this.nuevoProgreso.emit(valor)
      }
    }


  }

}

