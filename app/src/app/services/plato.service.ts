import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { PlatoForm } from '../interfaces/plato-form';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  constructor(private http: HttpClient) { }
  obtenerPlato(id:string){
    return this.http.get(`${environment.base_url}/platos?id=${id}`, this.cabeceras);
  }
  obtenerPlatos(){
    return this.http.get(`${environment.base_url}/platos`, this.cabeceras);
  }
  obtenerPlatosFiltros(orden_fecha:string,plan:string){
    if(plan.length > 0){
      return this.http.get(`${environment.base_url}/platos?ordenFecha=${orden_fecha}&nombrePlan=${plan}`, this.cabeceras);
    }else{
      return this.http.get(`${environment.base_url}/platos?ordenFecha=${orden_fecha}`, this.cabeceras);
    }
  }
  crearPlato(formData: PlatoForm){
    return this.http.post(`${environment.base_url}/platos`, formData, this.cabeceras);
  }
  actualizarPlato(id:string,form:any){
    return this.http.put(`${environment.base_url}/platos/${id}`, form, this.cabeceras);
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
