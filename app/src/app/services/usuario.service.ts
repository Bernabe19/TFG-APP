import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { LoginForm } from '../interfaces/login-form';
import { RegisterForm } from '../interfaces/register-form';
import { environment } from 'src/environments/environment';
import { ActualizarForm } from '../interfaces/actualizar-form';
import { PasswordForm } from '../interfaces/password-form';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
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
  actualizarUsuario(id:string,formData: ActualizarForm){
    return this.http.put(`${environment.base_url}/usuarios/${id}`, formData, this.cabeceras);
  }
  cambiarPassword(formData: PasswordForm){
    return this.http.post(`${environment.base_url}/usuarios/nuevaContrasena`,formData, this.cabeceras);
  }
  obtenerInfoToken(){
    return this.http.get(`${environment.base_url}/login/token`, this.cabeceras);
  }
  cambiarPlan(id:string,objetivo:number){
    return this.http.put(`${environment.base_url}/usuarios/${id}`, {"objetivo":objetivo}, this.cabeceras);
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
