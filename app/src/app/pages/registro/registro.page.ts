import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public contador = 0;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  volver(){
    switch (this.contador) {
      case 0:
        this.router.navigateByUrl('inicio');
      break;
      case 1:
        this.router.navigateByUrl('inicio');
      break;
      case 2:
        this.router.navigateByUrl('inicio');
      break;
      case 3:
        this.router.navigateByUrl('inicio');
      break;
      case 4:
        this.router.navigateByUrl('inicio');
      break;
      default:
        break;
    }
  }
}
