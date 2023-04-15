import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import informacion_nutricional from '../../../assets/informacion_nutricional.json';
import * as tf from '@tensorflow/tfjs';
import { loadLayersModel } from '@tensorflow/tfjs';
import { from, Observable } from 'rxjs';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {
  public foodList:{nombre_pred:string,nombre:string,calorias:number,grasas:number,proteinas:number,carbohidratos:number}[] = informacion_nutricional;
  public red:any;
  public model:any;
  public predictions:any;
  public imagen:any;
  public labels_20 = [
      'apple_pie','caesar_salad','cheesecake','chicken_curry','churros','donuts','escargots','fish_and_chips','french_fries','greek_salad','hamburguer','ice_cream','macarons','omelette','paella','pizza','ramen','spring_rolls','sushi','tacos'
  ];
  constructor(private router: Router) { }
  ngOnInit() {
    console.log(this.foodList);

  }
  login(){
    this.router.navigateByUrl('login');
  }
  registro(){

    this.router.navigateByUrl('registro');
  }
  // async prueba(){
  //     let data = "";
  //     const worker = await new Worker("../../../../assets/worker.js");
  //     await worker.postMessage({ data });
  //     worker.onmessage = async ( val:any ) => {
  //       this.model = val.data;
  //     };

  // }

}
