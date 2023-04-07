import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { LoginForm } from '../interfaces/login-form';
import { RegisterForm } from '../interfaces/register-form';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private router: Router) { }
  login( formData: LoginForm) {
    return this.http.post(`${environment.base_url}/login`, formData)
     .pipe(
      tap( (res : any) => {
        localStorage.setItem('x-token', res['token']);
        console.log(localStorage.getItem('x-token'));
      })
    );
  }
  register( formData: RegisterForm) {
    return this.http.post(`${environment.base_url}/usuarios`, formData)
     .pipe(
      tap( (res : any) => {
       console.log("Usuario registrado", res["usuario"]["nombre_usuario"]);
      })
    );
  }
  obtenerNombresUsuario(){
    return this.http.get(`${environment.base_url}/usuarios/nombre`);
  }
  obtenerInfoToken(){
    return this.http.get(`${environment.base_url}/login/token`, this.cabeceras);
  }

  get cabeceras() {
    return {
      headers: {
        'x-token': this.token
      }};
  }
  get token(): string {
    return localStorage.getItem('x-token') || '';
  }
}
