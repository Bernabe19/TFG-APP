import { Component, OnInit} from '@angular/core';
import { AlertController, AlertInput, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder} from '@angular/forms';
import { ActualizarForm } from '../../interfaces/actualizar-form';
import { PasswordForm } from 'src/app/interfaces/password-form';
@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {
  public estado:number = -1;
  public nombreUsuario:string = "";
  public peso:number = -1;
  public uid:string = "";
  public password:string = "";
  public passwordNueva:string = "";
  public passwordNuevaRepite:string = "";
  public actualizarForm = this.fb.group({
    nombre_usuario: '',
    peso: 0,
    estado_animico: 0
  });
  public passwordForm = this.fb.group({
    contrasenaActual: '',
    contrasenaNueva: '',
    contrasenaNuevaRepite: ''
  });
  public edit_nombre:boolean = true;
  public edit_peso:boolean = true;
  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario(){
    this.usuarioService.obtenerInfoToken().subscribe({
       next: async(res:any) =>{
        console.log(res);
        this.nombreUsuario = await res["nombreUsuario"];
        this.estado = await res["estado_animico"];
        this.peso = await res['peso'];
        this.uid = await res['uid'];
        this.cargarDatos();
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
  cargarDatos(){
    const caras = Array.from(document.getElementsByClassName('cara')) as Array<HTMLElement>;
    for( let i = 0; i < caras.length; i++){
      if(i === this.estado){
        caras[i].style.color = 'var(--ion-color-verdefosfo)';
      }else{
        caras[i].style.color = 'var(--ion-color-grisaux)';
      }
    }
  }
  redirigir(){
    this.router.navigateByUrl('dashboard');
  }
  async mostrarAlerta(){
    const alert = await this.alertController.create({
      header: 'Cambiar contraseña',
      cssClass: 'custom-alert',
      inputs:[
        {
          cssClass: 'input_alert',
          name: "input_pass",
          placeholder: "Contraseña actual",
          attributes:{
            maxlength: 16,
            type: "password",

          }
        },
        {
          cssClass: 'input_alert',
          name: "input_pass_new",
          placeholder: "Contraseña nueva",
          attributes:{
            maxlength: 16,
            type: "password",
            value: this.passwordNueva
          }
        },
        {
          cssClass: 'input_alert',
          name: "input_pass_new2",
          placeholder: "Contraseña nueva",
          attributes:{
            maxlength: 16,
            type: "password",
          }
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: () => {
          },
        },
        {
          text: 'Cambiar',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: (alertData) => {
            this.password = alertData.input_pass;
            this.passwordNueva = alertData.input_pass_new;
            this.passwordNuevaRepite = alertData.input_pass_new2;
            this.cambiarContrasena();
          },
        },
      ],
    });
    await alert.present();
  }
  async mostrarToast(position:'top',mensaje:string,handle:string,cssClass:string) {
    let icono = "";
    if(handle === "error"){
      icono = "sad";
    }else if(handle === "exito"){
      icono = "happy";
    }
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: position,
      icon: icono,
      cssClass: cssClass
    });

    await toast.present();
  }
  actualizarUsuario(){
    console.log(this.actualizarForm.value.estado_animico)
    const obj : ActualizarForm = {
      nombreUsuario: this.actualizarForm.value.nombre_usuario || '',
      peso: this.actualizarForm.value.peso ||  0,
      estado_animico: this.actualizarForm.value.estado_animico || 0
    }
    this.usuarioService.actualizarUsuario(this.uid,obj).subscribe({
      next: (res) =>{
        console.log(res);
        this.mostrarToast('top','Usuario actualizado correctamente',"exito","toast_exito");
      },
      error: (error) =>{
        console.log(error);
        this.mostrarToast('top','Ha habido un error al actualizar',"error","toast_error");
      }
    });
  }
  cambiarContrasena(){
    console.log(this.password)
    const obj_password : PasswordForm = {
      contrasenaActual: this.password,
      contrasenaNueva: this.passwordNueva,
      contrasenaNuevaRepite: this.passwordNuevaRepite
    }
    this.usuarioService.cambiarPassword(obj_password).subscribe({
      next: (res) =>{
        console.log(res);
        this.mostrarToast('top','Contraseña cambiada correctamente','exito',"toast_exito");
      },
      error: (error) =>{
        console.log(error);
        this.mostrarToast('top','Error al cambiar contraseña','error',"toast_error");
      }
    })
  }
  cambiarEstado(obj:number){
    this.estado = obj;
    this.actualizarForm.value.estado_animico = this.estado;
    const caras = Array.from(document.getElementsByClassName('cara')) as Array<HTMLElement>;
    for( let i = 0; i < caras.length; i++){
      if(i === obj){
        caras[i].style.color = 'var(--ion-color-verdefosfo)';
      }else{
        caras[i].style.color = 'var(--ion-color-grisaux)';
      }
    }
  }
  cambiarLectura(campo:number){
    switch (campo) {
      case 0:
        this.edit_nombre = this.edit_nombre === false ? true : false;
        break;
      case 1:
        this.edit_peso = this.edit_peso === false ? true : false;
        break;
      default:
        break;
    }
  }
}

