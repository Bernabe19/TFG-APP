import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-captura-plato',
  templateUrl: './captura-plato.page.html',
  styleUrls: ['./captura-plato.page.scss'],
})
export class CapturaPlatoPage implements OnInit {

  constructor() {}
  ngOnInit() {}

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    console.log(capturedPhoto);
  }
}
