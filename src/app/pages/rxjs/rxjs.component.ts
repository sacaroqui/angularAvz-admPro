import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { filter, map, take } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs!:Subscription
  constructor(){
    
  //  this.retornaObservable().subscribe(
  //       valor=> console.log('obs:',valor),
  //       error=> console.error(error),
  //       ()=> console.log('observable completado')
  //     )

  this.intervalSubs= this.retornaIntervalo().subscribe(console.log)
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }


  retornaIntervalo(){
    const intervalo$ = interval(500)
                        .pipe(
                          // take(10),   //operador rxjs que define el numero veces que resuelve el observador hasta que queda finalizado de manera automatica 
                          map(valor=>valor+1), //Este operador toma la respuesta del padre y transforma la respuesta
                          filter(valor => (valor%2===0)?true:false) // Filtra los resultados para regresar solo los numeros pares 

                        )
    return intervalo$;

  }




  retornaObservable():Observable<number>{
    return new Observable (observador=>{
      let i=-1
      const intervalo= setInterval(()=>{
          i++
          observador.next(i);
          if(i===4){
            clearInterval(intervalo);
            observador.complete();
          }
          // if(i===2){
          //   observador.error('Se llego al numero 2')
          // }
      },1000)
    })
  }

  

}
