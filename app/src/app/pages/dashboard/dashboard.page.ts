import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import data from './../../../assets/modelos/model_prueba/model.json';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public model:any;
  public predictions:any;
  public imagen:any;
  public labels_20 = [
      'apple_pie','caesar_salad','cheesecake','chicken_curry','churros','donuts','escargots','fish_and_chips','french_fries','greek_salad','hamburguer','ice_cream','macarons','omelette','paella','pizza','ramen','spring_rolls','sushi','tacos'
  ];
  public nombreUsuario : string = "";
  public objetivo : number = -1;
  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cargarUsuario();
  }
  cargarUsuario(){
    this.usuarioService.obtenerInfoToken().subscribe({
       next: async(res:any) =>{
        this.nombreUsuario = await res["nombreUsuario"] || "";
        this.objetivo = await res["objetivo"] || "";
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
  async mostrarAlerta(){
    const alert = await this.alertController.create({
      header: '¿Desea abandonar foodfollow?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: () => {
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.borrarToken();
            this.router.navigateByUrl('inicio');
          },
        },
      ],
    });
    await alert.present();
  }
  async alertaPlan(){
    const alert = await this.alertController.create({
      header: 'Tienes que estar suscrito a un plan para poder capturar un plato',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: () => {
          },
        },
      ],
    });
    await alert.present();
  }
  borrarToken(){
    if(localStorage.getItem('x-token')){
      localStorage.removeItem('x-token');
    }
  }
  accederFuncionalidad(opcion:string){
    if(opcion === 'captura-plato'){
      if(![0,1,2].includes(this.objetivo)){
        console.log(this.objetivo);
        this.alertaPlan();
      }else{
        this.router.navigateByUrl(opcion);
      }
    }else{
      this.router.navigateByUrl(opcion);
    }
  }

}
