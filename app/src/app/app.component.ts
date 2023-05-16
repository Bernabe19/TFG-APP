import { Component } from '@angular/core';
import { Router } from '@angular/router';
import '@ionic/core';
import '@ionic/pwa-elements';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public router: Router,
  ) {
      this.redirigir();
    }

    redirigir(){
      if(localStorage.getItem('x-token') !== null){
        this.router.navigateByUrl('dashboard');
      }else{
        this.router.navigateByUrl('inicio');
      }
    }
    // redirigir(){
    //   this.router.navigateByUrl('ajustes');
    // }

}
