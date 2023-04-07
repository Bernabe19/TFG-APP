import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder} from '@angular/forms';
import { RegisterForm } from '../../interfaces/register-form';
import { Observable } from 'rxjs';
import { RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public contador = 0;
  public usuarios: any;
  public texto = "¿Qué nombre de usuario te gustaría tener? Recuerda que es posible que otro usuario ya tenga ese nombre.";
  public textoBoton = 'CONTINUAR';
  public progreso = 0;
  public objetivo = -1;
  public estado = -1;
  public peso: RangeValue = 35;
  public registerForm = this.fb.group({
    nombre_usuario: '',
    password: '',
    objetivo: 0,
    peso: 0,
    estado_animico: 0
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.usuarioService.obtenerNombresUsuario().subscribe({
      next: (res:any) =>{
        this.usuarios = res['usuarios'];
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }
  async mostrarCarga(){
    const loading = await this.loadingCtrl.create({
      message: 'Registrando Usuario',
      duration: 2000,
      cssClass: 'custom-loading',
    });

    loading.present();
  }
  usuarioBoton(){
    const boton = document.getElementById('boton') as HTMLButtonElement;
    const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    switch (this.contador) {
      case 0:
        const usuario = document.getElementById('nombre_usuario') as HTMLInputElement;
        for (let i = 0; i < this.usuarios.length; i++) {
          if(this.usuarios[i].nombreUsuario === usuario.value || usuario.value.length < 5){
            boton.disabled = true;
            break;
          }else{
            boton.disabled = false;
          }
        }
        break;
      case 1:
        const password = document.getElementById('password') as HTMLInputElement;
        if(regPassword.test(password.value)){
          boton.disabled = false;
        }else{
          boton.disabled = true;
        }
        break;
      case 2:

        break;
      case 3:

        break;
      case 4:

        break;
      default:
        break;
    }
  }

  registro(){
    const obj : RegisterForm = {
      nombreUsuario: this.registerForm.value.nombre_usuario || '',
      password: this.registerForm.value.password || '',
      objetivo: this.objetivo || 0,
      peso: this.registerForm.value.peso || Number(this.peso),
      estado_animico: this.estado || 0
    }
    this.usuarioService.register(obj).subscribe({
      next: (res) =>{
        console.log(res);
        this.router.navigateByUrl('login');
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }
  comprobacionVolver(valor:any){
    const boton = document.getElementById('boton') as HTMLButtonElement;
    switch (valor) {
      case 0:
        for (let i = 0; i < this.usuarios.length; i++) {
          if(this.usuarios[i].nombreUsuario === ''){
            boton.disabled = true;
            break;
          }else{
            boton.disabled = false;
          }
        }
        break;
      default:
        break;
    }
  }
  volver(){
    const boton = document.getElementById('boton') as HTMLButtonElement;
    this.contador--;
    switch (this.contador) {
      case -1:
        this.router.navigateByUrl('inicio');
      break;
      case 0:
        this.comprobacionVolver(0);
        this.texto = "¿Qué nombre de usuario te gustaría tener? Recuerda que es posible que otro usuario ya tenga ese nombre.";
        this.progreso = 0;
        this.textoBoton = 'CONTINUAR';
      break;
      case 1:
        this.texto = "Necesitas una contraseña para custodiar tus platos. Debe tener al menos una mayúscula, un dígito y ocho caracteres.";
        this.progreso = 0.20;
        this.textoBoton = 'CONTINUAR';
      break;
      case 2:
        this.texto = '¿Cuál es tu objetivo principal?'
        this.progreso = 0.40;
        this.textoBoton = 'CONTINUAR';
        setTimeout(() =>{
          this.cambiarObjetivo(this.objetivo)
        }, 10);
      break;
      case 3:
        setTimeout(() =>{
          this.cambiarEstado(this.estado)
        }, 10);
        this.texto = '¿Cuál es tu estado anímico?'
        this.progreso = 0.60;
        this.textoBoton = 'CONTINUAR';
      break;
      case 4:
        this.texto = '¿Cuál es tu peso actual?'
        this.progreso = 0.80;
        this.textoBoton = 'CONTINUAR';
      break;
      default:
        break;
    }
  }
  siguientePaso(){
    const boton = document.getElementById('boton') as HTMLButtonElement;
    const flecha_volver = document.getElementById('flecha_volver') as HTMLElement;
    const header = document.getElementsByClassName('header')[0] as HTMLElement;
    this.contador++;
    switch (this.contador) {
      case 0:
      this.texto = "¿Qué nombre de usuario te gustaría tener? Recuerda que es posible que otro usuario ya tenga ese nombre.";
      break;
      case 1:
        if(this.registerForm.value.password === ''){
            boton.disabled = true;
        }
        this.progreso = 0.20;
        this.texto = "Necesitas una contraseña para custodiar tus platos. Debe tener al menos una mayúscula, un dígito y ocho caracteres.";
        break;
      case 2:
        setTimeout(() =>{
          this.cambiarObjetivo(this.objetivo)
        }, 10);
        this.texto = '¿Cuál es tu objetivo principal?'
        this.progreso = 0.40;
      break;
      case 3:
        setTimeout(() =>{
          this.cambiarEstado(this.estado);
        }, 10);
        this.texto = '¿Cuál es tu estado anímico?'
        this.progreso = 0.60;
      break;
      case 4:
        this.texto = '¿Cuál es tu peso actual?'
        this.progreso = 0.80;
        this.textoBoton = 'REGISTRAR';
      break;
      case 5:
        header.style.justifyContent = 'center';
        boton.style.display = 'none';
        flecha_volver.style.display = 'none'
        this.texto = '';
        this.progreso = 1;
        this.mostrarCarga();
        setTimeout(() =>{
          this.registro()
        }, 2000);
      break;
      default:
        break;
    }
  }

  cambiarObjetivo(obj:any){
    const boton = document.getElementById('boton') as HTMLButtonElement;
    this.objetivo = obj;
    this.registerForm.value.objetivo = this.objetivo;
    if(this.objetivo === -1){
      boton.disabled = true;
    }else{
      boton.disabled = false;
    }
    const objetivos = Array.from(document.getElementsByClassName('objetivo_box')) as Array<HTMLElement>;
    for( let i = 0; i < objetivos.length; i++){
      if(i === obj){
        let p = objetivos[i].children[1] as HTMLElement;
        p.style.color = 'var(--ion-color-verdefosfo)';
      }else{
        let p = objetivos[i].children[1] as HTMLElement;
        p.style.color = 'var(--ion-color-blancotexto)';
      }
    }
  }
  cambiarEstado(obj:any){
    const boton = document.getElementById('boton') as HTMLButtonElement;
    this.estado = obj;
    this.registerForm.value.estado_animico = this.estado;
    if(this.estado === -1){
      boton.disabled = true;
    }else{
      boton.disabled = false;
    }
    const caras = Array.from(document.getElementsByClassName('caras')) as Array<HTMLElement>;
    for( let i = 0; i < caras.length; i++){
      if(i === obj){
        caras[i].style.color = 'var(--ion-color-verdefosfo)';
      }else{
        caras[i].style.color = 'var(--ion-color-grisaux)';
      }
    }
  }

  cambiarPeso(ev: Event) {
    this.peso = (ev as RangeCustomEvent).detail.value;
  }

}
