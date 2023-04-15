import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SuscripcionForm } from '../interfaces/suscripcion-form';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  constructor(private http: HttpClient) { }
  crearSuscripcion(formData: SuscripcionForm){
    return this.http.post(`${environment.base_url}/suscripciones`,formData, this.cabeceras);
  }
  obtenerSuscripcion(){
    return this.http.get(`${environment.base_url}/suscripciones`, this.cabeceras);
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
