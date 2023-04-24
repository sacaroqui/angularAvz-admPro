import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class AuthModule { }
