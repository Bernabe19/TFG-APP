import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { PlatoService } from '../../services/plato.service';
Chart.register(...registerables);

@Component({
  selector: 'app-info-plato',
  templateUrl: './info-plato.page.html',
  styleUrls: ['./info-plato.page.scss'],
})
export class InfoPlatoPage implements OnInit {
  public uid_plato:any;
  public pieChart: any;
  public calorias:number = 0;
  public proteinas:number = 0;
  public carbohidratos:number = 0;
  public grasas:number = 0;
  public src:string = "";
  public nombre:string = "";
  public pagina:string = "";
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private platoService:PlatoService
  ) {

  }

  ngOnInit() {
    this.identificador();
    this.cargarPlato();


  }

  identificador(){
    this.route.queryParamMap.subscribe((queryParams) => {
      this.uid_plato = queryParams.get('uid_plato');
      this.pagina = queryParams.get('pagina') || "";
    });
  }
  cargarPlato(){
    this.platoService.obtenerPlato(this.uid_plato).subscribe({
      next:(res:any) =>{
        console.log(res);
        this.calorias = res["plato"]["calorias"];
        this.grasas = res["plato"]["grasas"];
        this.carbohidratos = res["plato"]["carbohidratos"];
        this.proteinas = res["plato"]["proteinas"];
        this.src = res["plato"]["imagen"]["secure_url"];
        this.nombre = res["plato"]["nombre"];
        setTimeout(() => {
          this.pieChartMethod();
        }, 100);
      },
      error:(error) =>{
        console.log(error);
      }
    })
  }
  redirigirDashboard(){
    this.router.navigateByUrl(this.pagina);
  }

  //chart
  pieChartMethod() {
    let canvas = document.getElementById("canvas") as any;
    this.pieChart = new Chart(canvas, {
      type: 'pie',
      data: {
        datasets: [{
          label: 'Gramos',
          data: [this.carbohidratos,this.grasas,this.proteinas],
          backgroundColor: [
            '#55B90A',
            '#DC561D',
            '#D71010'
          ],
          hoverBackgroundColor: [
            '#71FD09',
            '#EC5C1E',
            '#FD0909'
          ]
        }]
      },
    });
  }
}
