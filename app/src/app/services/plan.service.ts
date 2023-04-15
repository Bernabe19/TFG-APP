import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private http: HttpClient,
  ) { }
  obtenerPlanes(){
    return this.http.get(`${environment.base_url}/planes`, this.cabeceras);
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
