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
      this.llamarSplash();
    }

    llamarSplash(){
      this.router.navigateByUrl('splash');
    }
}
