import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  constructor(private http: HttpClient, private usuarioService:UsuarioService) { }

  obtenerEstadisticas(){
    return this.http.get(`${environment.base_url}/informacion/estadisticas`,this.usuarioService.cabeceras);
  }
  obtenerTrofeos(){
    return this.http.get(`${environment.base_url}/informacion/trofeos`,this.usuarioService.cabeceras);
  }
}
