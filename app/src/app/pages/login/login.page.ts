import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

  volver(){
    this.router.navigateByUrl('inicio');
  }
  mostrarOcultarPassword(opcion: any){
    const input = document.getElementById('password') as HTMLInputElement;
    if(opcion === 'mostrar'){
      const no_eye = document.getElementById('no_eye') as HTMLElement;
      no_eye.style.display = 'none';
      const eye =  document.getElementById('eye') as HTMLElement;
      eye.style.display = 'block';
      input.type = 'text';
    }else if(opcion == "ocultar"){
      const eye = document.getElementById('eye') as HTMLElement;
      eye.style.display = 'none';
      const no_eye =  document.getElementById('no_eye') as HTMLElement;
      no_eye.style.display = 'block';
      input.type = 'password';
    }
  }

}
