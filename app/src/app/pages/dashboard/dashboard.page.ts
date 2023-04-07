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
  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.loadModel();
    this.cargarUsuario();
  }
  cargarUsuario(){
    this.usuarioService.obtenerInfoToken().subscribe({
       next: async(res:any) =>{
        this.nombreUsuario = await res["nombreUsuario"] || "";
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
            console.log("Operación cancelada");
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
  borrarToken(){
    if(localStorage.getItem('x-token')){
      localStorage.removeItem('x-token');
    }
  }
  // async loadModel(){
  //   this.model = await tf.loadLayersModel("http://localhost:8014/modelo_vgg16/model.json");
  //   this.predict();
  // }
  // async predict() {
  //   // imageData = 'https://www.shutterstock.com/image-photo/background-healthy-food-fresh-fruits-260nw-1260483340.jpg';
  //   let im = document.getElementById('img') as HTMLImageElement;
  //   const pred = await tf.tidy(() => {
  //     // Conversion de la iamgen a pixeles con formato [224,224,3]
  //     let img = tf.browser.fromPixels(im).resizeBilinear([224,224])
  //     // Cambiar forma conforme a la definida en la entrada del modelo [1,224,224,3] Tensor4D
  //     img = img.reshape([1,224,224,3]);
  //     img = tf.cast(img, 'float32');
  //     // Make and format the predications
  //     const output = this.model.predict(img) as any;
  //     // Save predictions on the component
  //     this.predictions = Array.from(output.dataSync());
  //     //Obtenemos el valor maximo y mostranmos prediccion
  //     console.log('Resultado: ' + this.labels_20[this.predictions.indexOf(Math.max(...this.predictions))] + "Porcentaje " + Math.max(...this.predictions) * 100 ) ;
  //   });
  // }
}
