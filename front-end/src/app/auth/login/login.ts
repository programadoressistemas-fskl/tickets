import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LoginService } from '../services/login/login';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  protected formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.crearFormLogin();
  }

  private crearFormLogin(): void {
    this.formLogin = this.fb.group({
      correo: [null, [Validators.required, Validators.email, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-_:@#$%&+{}()?¿!¡\n]*')]],
      password: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-_:@#$%&+{}()?¿!¡\n]*')]]
    });
  }

  protected iniciarSesion(): void {
    console.log(this.formLogin.value.correo);
    const credenciales: any = {
      correo_electronico: this.formLogin.value.correo,
      password: this.formLogin.value.password,
    }

    this.loginService.login(credenciales).toPromise().then(
      respuesta => {
        console.log(respuesta);
      }, error =>{
        console.log(error.error);
        
      }
    )
  }
}
