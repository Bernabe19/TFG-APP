import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public nombreUsuario : string = "";
  public objetivo : number = -1;

  constructor(
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cargarUsuario();
  }
  cargarUsuario(){
    this.usuarioService.obtenerInfoToken().subscribe({
       next: (res:any) =>{
        console.log(res)
        this.nombreUsuario =  res["nombreUsuario"];
        this.objetivo =  res["objetivo"];
        console.log(this.objetivo);
        console.log(this.nombreUsuario)
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
    if(localStorage.getItem('token')){
      localStorage.removeItem('token');
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
