import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import * as tf from '@tensorflow/tfjs';
import { PlatoService } from 'src/app/services/plato.service';
import { SuscripcionService } from 'src/app/services/suscripcion.service';
import informacion_nutricional from '../../../assets/informacion_nutricional.json';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-captura-plato',
  templateUrl: './captura-plato.page.html',
  styleUrls: ['./captura-plato.page.scss'],
})
export class CapturaPlatoPage implements OnInit {
  public model:any;
  public predictions:any;
  public imagen:any;
  public uid_suscripcion:string = "";
  public calorias:number = -1;
  public carbohidratos:number = -1;
  public proteinas:number = -1;
  public grasas:number = -1;
  public nombre:string = "parcial";
  public nombre_pred:string = "";
  public uid_plato:string = "";
  public src:string = "";
  public labels_20 = [
      'apple_pie','caesar_salad','cheesecake','chicken_curry','churros','donuts','escargots','fish_and_chips','french_fries','greek_salad','hamburguer','ice_cream','macarons','omelette','paella','pizza','ramen','spring_rolls','sushi','tacos'
  ];
  public foodList:{nombre_pred:string,nombre:string,calorias:number,grasas:number,proteinas:number,carbohidratos:number}[] = informacion_nutricional;
  constructor(
    private platoService: PlatoService,
    private suscripcionService: SuscripcionService,
    private router: Router,
    private loadingService:LoadingService,
  ) {}

  ngOnInit() {
    this.loadModel();
    this.obtenerSuscripcion();
  }

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });
    this.imagen = capturedPhoto.dataUrl;
    await this.crearPlato();
    this.loadingService.present();
  }

  async loadModel(){
    let a = performance.now()
    this.model = await tf.loadLayersModel("../../../assets/modelos/modelo_vgg16/model.json");
    let b = performance.now()
    console.log(`La carga del modelo ha durado ${b-a} ms`);
  }

  async predict() {

      let a = performance.now()
      const pred = await tf.tidy(() => {
      this.src = localStorage.getItem("src") || "";
      // let im = document.getElementById('img') as HTMLImageElement;
      const im = new Image()
      im.src = this.src;
      im.crossOrigin = "anonymus";
      im.onload = () => {
        console.log(im);
        // Conversion de la iamgen a pixeles con formato [224,224,3]
        let img = tf.browser.fromPixels(im).resizeBilinear([224,224])
        // Cambiar forma conforme a la definida en la entrada del modelo [1,224,224,3] Tensor4D
        img = img.reshape([1,224,224,3]);
        img = tf.cast(img, 'float32');
        const output = this.model.predict(img) as any;
        this.predictions = Array.from(output.dataSync());
        let b = performance.now()
        console.log(`La prediccion ha durado ${b-a} ms`);
        let predictedMax =  this.predictions.indexOf(Math.max(...this.predictions));
        console.log('Resultado: ' + this.labels_20[predictedMax] + "Porcentaje " + Math.max(...this.predictions) * 100 ) ;
        let plato = this.foodList[predictedMax];
        this.nombre = plato.nombre;
        this.calorias = plato.calorias;
        this.proteinas = plato.proteinas;
        this.grasas = plato.grasas;
        this.carbohidratos = plato.carbohidratos;
        this.actualizarPlato();
      }
      // let im = document.createElement('img') as HTMLImageElement;
      // im.id = "img";
      // im.src = this.src;
      // im.crossOrigin = "anonymus";
      // console.log(im);
      // // Conversion de la iamgen a pixeles con formato [224,224,3]
      // let img = tf.browser.fromPixels(im).resizeBilinear([224,224])
      // // Cambiar forma conforme a la definida en la entrada del modelo [1,224,224,3] Tensor4D
      // img = img.reshape([1,224,224,3]);
      // img = tf.cast(img, 'float32');
      // const output = this.model.predict(img) as any;
      // this.predictions = Array.from(output.dataSync());
      // let b = performance.now()
      // console.log(`La prediccion ha durado ${b-a} ms`);
      // let predictedMax =  this.predictions.indexOf(Math.max(...this.predictions));
      // console.log('Resultado: ' + this.labels_20[predictedMax] + "Porcentaje " + Math.max(...this.predictions) * 100 ) ;
      // let plato = this.foodList[predictedMax];
      // this.nombre = plato.nombre;
      // this.calorias = plato.calorias;
      // this.proteinas = plato.proteinas;
      // this.grasas = plato.grasas;
      // this.carbohidratos = plato.carbohidratos;
      // this.actualizarPlato();
    });
  }
  obtenerSuscripcion(){
    this.suscripcionService.obtenerSuscripcion().subscribe({
      next: (res:any) =>{
        console.log(res);
        for(let i = 0; i < res['suscripcion'].length; i++){
          if(res["suscripcion"][i]["activa"] === true){
            this.uid_suscripcion = res["suscripcion"][i]["uid"];
          }
        }
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }
  async crearPlato(){
    const obj = {
      imagen: this.imagen,
      id_suscripcion: this.uid_suscripcion,
      nombre: this.nombre,
      calorias: this.calorias,
      carbohidratos: this.carbohidratos,
      grasas: this.grasas,
      proteinas: this.proteinas,
    }
    this.platoService.crearPlato(obj).subscribe({
      next: async(res:any) =>{
        console.log(res);
        this.uid_plato = await res['plato']['uid'];
        localStorage.setItem('uid_plato',res['plato']['uid']);
        this.src = await res['plato']['imagen']['secure_url'];
        localStorage.setItem('src',res['plato']['imagen']['secure_url']);
        setTimeout(() => {
          this.predict();
        }, 100);
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
  actualizarPlato(){
    const obj = {
      id_suscripcion: this.uid_suscripcion,
      nombre: this.nombre,
      calorias: this.calorias,
      carbohidratos: this.carbohidratos,
      grasas: this.grasas,
      proteinas: this.proteinas,
    }
    console.log("El src del plato es " + this.src);
    console.log("el id del plato es " +  this.uid_plato);
    this.uid_plato = localStorage.getItem('uid_plato') || "";
    this.platoService.actualizarPlato(this.uid_plato,obj).subscribe({
      next: (res:any) =>{
        console.log(res);
        this.loadingService.dismiss();
        this.router.navigate(['info-plato'],{ queryParams: { uid_plato: this.uid_plato, pagina: "dashboard" }});
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
  redirigirDashboard(){
    this.router.navigateByUrl('dashboard');
  }
}
