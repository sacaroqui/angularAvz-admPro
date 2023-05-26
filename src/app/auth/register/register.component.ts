import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})
export class RegisterComponent {
  public formSubmitted=false;
  public registerForm:FormGroup = this.fb.group({
    nombre:['Samir Caro',[Validators.required]],
    email :['test100@test.com',[Validators.required, Validators.email]],
    password:['123456',[Validators.required]],
    password2:['123456',[Validators.required]],
    terminos:[true,[Validators.required]]
  },{
    validators: this.ValidacionPasswordsIguales('password','password2')
  })

  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private router:Router)
  {}

  crearUsuario(){
    this.formSubmitted=true;
    console.log(this.registerForm.value);
    if(this.registerForm.invalid){
      return
    }
    this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe(resp=>{
          console.log('Usuario Creado');
          this.router.navigateByUrl('/dashboard');
          console.log(resp);
        },(err)=>{
          Swal.fire('Error',err.error.msg,'error');
        })
  }

  validacionCampo(campo:string):boolean{

    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
    
  }

  validacionTerminos():boolean{
    if(!this.registerForm.get('terminos')?.value && this.formSubmitted){
      return true
    }else{
      return false
    }
  }

  validarPassword():boolean{
    const pass1=this.registerForm.get('password')?.value;
    const pass2=this.registerForm.get('password2')?.value;
    if(pass1!==pass2 && this.formSubmitted){  
      return true
    }else{
      return false
    }

  }

  ValidacionPasswordsIguales(pass1:string,pass2:string){
    return (formGroup:FormGroup)=>{
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      if(pass1Control?.value===pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsIgual:true});
      }
    }

  }


}
