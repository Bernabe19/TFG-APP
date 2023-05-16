import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionService } from '../../services/informacion.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  public platos:number = 0;
  public calorias:number = 0;
  public grasas:number = 0;
  public carbohidratos:number = 0;
  public proteinas:number = 0;
  public peso:string = "0";
  public suscripciones:number = 0;
  constructor(private router: Router, private informacionService:InformacionService) { }

  ngOnInit() {
    this.obtenerEstadisticas();

  }

  redirigirDashboard(){
    this.router.navigateByUrl("dashboard");
  }

  async obtenerEstadisticas(){
    this.informacionService.obtenerEstadisticas().subscribe({
      next: (res:any) =>{
        console.log(res)
        this.platos = res["numPlatos"];
        this.suscripciones = res["numSuscripciones"];
        this.peso = res["peso"];
        this.calorias = res["cantidades"][0]["calorias"];
        this.grasas = Number((res["cantidades"][0]["grasas"]).toFixed(0));
        this.carbohidratos =  Number((res["cantidades"][0]["carbohidratos"]).toFixed(0));
        this.proteinas =  Number((res["cantidades"][0]["proteinas"]).toFixed(0));
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
}
