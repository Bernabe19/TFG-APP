import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionService } from '../../services/informacion.service';

@Component({
  selector: 'app-trofeos',
  templateUrl: './trofeos.page.html',
  styleUrls: ['./trofeos.page.scss'],
})
export class TrofeosPage implements OnInit {
  public platos_estado_animico : number = 0;
  public planes_consumidos : number = 0;
  public platos_perder_peso : number = 0;
  public platos_ganar_peso : number = 0;
  public platos_ganar_musculo : number = 0;
  public platos_estado_animico_trofeo : string = "notrofeo";
  public planes_consumidos_trofeo : string = "notrofeo";
  public platos_perder_peso_trofeo : string = "notrofeo";
  public platos_ganar_peso_trofeo : string = "notrofeo";
  public platos_ganar_musculo_trofeo : string = "notrofeo";
  public CONDICION : { ESTADO : number, PLANES : number, PERDER_PESO : number, GANAR_PESO : number, GANAR_MUSCULO : number } = {
    ESTADO : 20,
    PLANES : 3,
    PERDER_PESO: 8,
    GANAR_PESO : 25,
    GANAR_MUSCULO : 8
  };
  public TROFEO_SRC : { TROFEO1 : string, TROFEO2 : string, TROFEO3 : string, TROFEO4 : string, TROFEO5 : string } = {
    TROFEO1 : "trofeo1",
    TROFEO2 : "trofeo2",
    TROFEO3 : "trofeo3",
    TROFEO4 : "trofeo4",
    TROFEO5 : "trofeo5"
  };
  constructor(
    private router : Router,
    private informacionService : InformacionService,
  ) { }

  ngOnInit() {
    this.obtenerTrofeos();
  }
  redirigirDashboard(){
    this.router.navigateByUrl('dashboard');
  }
  obtenerTrofeos(){
    this.informacionService.obtenerTrofeos().subscribe({
      next: (res:any) =>{
        console.log(res);
        this.platos_estado_animico = res["platosEstadoAnimico"];
        this.planes_consumidos = res["suscripcionesDistintas"];
        this.platos_perder_peso = res["platos_perder_peso"];
        this.platos_ganar_peso = res["platos_ganar_peso"];
        this.platos_ganar_musculo = res["platos_ganar_musculo"];

        if(this.platos_estado_animico >= this.CONDICION.ESTADO){
          this.platos_estado_animico_trofeo = this.TROFEO_SRC.TROFEO1;
        }
        if(this.planes_consumidos >= this.CONDICION.PLANES){
          this.planes_consumidos_trofeo = this.TROFEO_SRC.TROFEO2;
        }
        if(this.platos_perder_peso >= this.CONDICION.PERDER_PESO){
          this.platos_perder_peso_trofeo = this.TROFEO_SRC.TROFEO3;
        }
        if(this.platos_ganar_peso >= this.CONDICION.GANAR_PESO){
          this.platos_ganar_peso_trofeo = this.TROFEO_SRC.TROFEO4;
        }
        if(this.platos_ganar_musculo >= this.CONDICION.GANAR_MUSCULO){
          this.platos_ganar_musculo_trofeo = this.TROFEO_SRC.TROFEO5;
        }

      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
}
