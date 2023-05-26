import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements AfterViewInit{
  
  @ViewChild('googleBtn') googleBtn!: ElementRef;
  
  public formSubmitted = false;

  public loginForm:FormGroup= this.fb.group({
    email:[localStorage.getItem('email') || '',[Validators.required,Validators.email]],
    password:['',Validators.required],
    remember:[false]
  })
  
  constructor(private router:Router,
              private fb:FormBuilder,
              private usuarioService:UsuarioService){}
  
  
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "382429250967-hq6te02vsqt5hh58geqp478mcu1t20b9.apps.googleusercontent.com",
      callback: (response:any)=> this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv")
      this.googleBtn.nativeElement, 
      {
          theme: "outline",
          size: "large"
      } // customization attributes
    );
  }

  handleCredentialResponse(response:any){
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
        .subscribe(resp=>{
          // console.log(resp);
          this.router.navigateByUrl('/dashboard');
        })
  }


  

  validacionCampo(campo:string):boolean{
    if(this.loginForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
    
  }

  login(){
    // this.router.navigateByUrl('/dashboard');
    this.formSubmitted=true;
    // const valor=(this.loginForm.value);
    if(this.loginForm.invalid){
      return
    }
    this.usuarioService.loginUsuario(this.loginForm.value)
        .subscribe(resp=>{
          // console.log('login hecho');
          // console.log(resp);
          if(this.loginForm.get('remember')?.value){
            localStorage.setItem('email',this.loginForm.get('email')?.value);
          }else{
            localStorage.removeItem('email')
          }
          this.router.navigateByUrl('/dashboard');
        },(err)=>{
          Swal.fire('Error',err.error.msg,'error');
        })
       
    
  }

}
