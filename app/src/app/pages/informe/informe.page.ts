import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PlatoService } from '../../services/plato.service';
import { IonContent } from '@ionic/angular';
@Component({
  selector: 'app-informe',
  templateUrl: './informe.page.html',
  styleUrls: ['./informe.page.scss'],
})
export class InformePage implements OnInit {
  @ViewChild(IonContent, { static: true }) content!: IonContent;
  public platos:any;
  public items:any;
  public count:number = 10;
  public orden_fecha:string = "desc";
  public opcion_plan:number = -1;
  public nombre_plan:string = "";
  constructor(
    private router:Router,
    private platoService:PlatoService,
  ) { }

  ngOnInit() {
    this.cargarPlatos();
  }
  redirigirDashboard(){
    this.router.navigateByUrl('dashboard');
  }
  cargarPlatos(){
    this.platoService.obtenerPlatos().subscribe({
      next: (res:any) =>{
        this.platos = res['plato'];
        this.items = this.platos.slice(0,10)
      },
      error: (error) =>{
        console.log(error)
      }
    })
  }
  convertirFecha(fecha:any){
    fecha = new Date(fecha);
    let dia = String(fecha.getDate());
    let mes = String(fecha.getMonth() + 1);
    let year = String(fecha.getFullYear());
    if(dia.length === 1 ){
      dia = "0" + dia;
    }
    if(mes.length === 1 ){
      mes = "0" + mes;
    }
    return `${dia}/${mes}/${year}`;
  }
  accederPlato(uid_plato:string){
    this.router.navigate(['info-plato'],{ queryParams: { uid_plato: uid_plato, pagina: "informe" }});
  }
  busqueda(){
    this.platoService.obtenerPlatosFiltros(this.orden_fecha,this.nombre_plan).subscribe({
      next: (res:any) => {
        this.platos = res['plato'];
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
  ionViewWillEnter(){
    this.content.scrollToTop();
  }
  planSeleccionado(plan:number){
    const planes =  Array.from(document.getElementsByClassName('plan')) as Array<HTMLElement>;
    for (let i = 0; i < planes.length; i++) {
      if(plan === i){
        planes[i].style.border = "solid 3px var(--ion-color-blancotexto)";
      }else{
        planes[i].style.border = "";
      }
    }
    this.opcion_plan = plan;
    switch (this.opcion_plan) {
      case 0:
        this.nombre_plan = "Perder peso";
        break;
      case 1:
        this.nombre_plan = "Ganar peso";
        break;
      case 2:
        this.nombre_plan = "Ganar músculo";
        break;
      default:
        break;
    }
  }
  cambiarOrdenFecha(orden:any){
    this.orden_fecha = String(orden.detail.value);
    console.log(this.orden_fecha)
  }

}
