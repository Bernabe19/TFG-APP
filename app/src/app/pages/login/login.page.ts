import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from '../../interfaces/login-form';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm = this.fb.group({
    nombre: '',
    password: ''
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
    ) { }

  ngOnInit() {
  }

  volver(){
    this.router.navigateByUrl('inicio');
  }
  mostrarOcultarPassword(opcion: any){
    const input = document.getElementById('password') as HTMLInputElement;
    if(opcion === 'mostrar'){
      const no_eye = document.getElementById('no_eye') as HTMLElement;
      no_eye.style.display = 'none';
      const eye =  document.getElementById('eye') as HTMLElement;
      eye.style.display = 'block';
      input.type = 'text';
    }else if(opcion == "ocultar"){
      const eye = document.getElementById('eye') as HTMLElement;
      eye.style.display = 'none';
      const no_eye =  document.getElementById('no_eye') as HTMLElement;
      no_eye.style.display = 'block';
      input.type = 'password';
    }
  }
  mostrarLogin(){
    const usuario = document.getElementById('usuario') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const enviar = document.getElementById('enviar') as HTMLInputElement;
    if(usuario.value.length > 0 && password.value.length > 0){
      enviar.style.display = 'block';
    }else if(usuario.value.length == 0 || password.value.length == 0){
      enviar.style.display = 'none';
    }
  }
  login(){
    console.log(this.loginForm.value.nombre);
    console.log(this.loginForm.value.password);
    console.log(this.loginForm);
    const obj : LoginForm = {
      nombreUsuario: this.loginForm.value.nombre || '',
      password: this.loginForm.value.password || ''
    }
    this.usuarioService.login(obj).subscribe({
      next: (res) =>{
        console.log(res);
        console.log("El usuario se ha logueado correctamente");
        this.router.navigateByUrl('dashboard');
      },
      error: (err) =>{
        console.log(err);
        this.lanzarAviso();
      }
    })
  }
  lanzarAviso(){
    const aviso = document.getElementById('aviso') as HTMLInputElement;
    aviso.style.display = "block";
  }

}
