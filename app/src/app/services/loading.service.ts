import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading:boolean = false;

  constructor(public loadingController: LoadingController) { }

  async present() {
    this.isLoading = true;
    await this.loadingController.create({
      message: 'Realizando predicción',
      cssClass: 'custom-loading',
      showBackdrop: false
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
}
