import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastController } from '@ionic/angular';
import { PlanService } from 'src/app/services/plan.service';
import { SuscripcionService } from 'src/app/services/suscripcion.service';
import { SuscripcionForm } from 'src/app/interfaces/suscripcion-form';
import { FormBuilder} from '@angular/forms';



@Component({
  selector: 'app-planes',
  templateUrl: './planes.page.html',
  styleUrls: ['./planes.page.scss'],
})
export class PlanesPage implements OnInit {
  public objetivo:number = -1;
  public planes:any;
  public uid : string = "";
  public peso : number = -1;
  public suscripcionForm = this.fb.group({
    id_usuario: "",
    id_plan: "",
    fecha_inicio: null,
    fecha_fin: null,
    peso: 0,
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private planService: PlanService,
    private suscripcionService: SuscripcionService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.cargarUsuario();
    this.cargarPlanes();
  }

  redirigirDashboard(){
    this.router.navigateByUrl('dashboard');
  }
  cargarUsuario(){
    this.usuarioService.obtenerInfoToken().subscribe({
       next: async(res:any) =>{
        console.log(res);
        this.objetivo = await res["objetivo"];
        this.uid = await res["uid"];
        this.peso = await res["peso"];
        await this.cargarPlan();
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
  async cargarPlan(){
    console.log(this.objetivo);
    const planes = Array.from(document.getElementsByClassName('plan')) as Array<HTMLElement>;
    for (let i = 0; i < planes.length; i++) {
      console.log(planes[i].classList[1]);
      if(Number(planes[i].classList[1].split("plan")[1]) - 1 === this.objetivo){
        planes[i].style.opacity = '1';
      }else if (Number(planes[i].classList[1].split("plan")[1]) - 1 !== this.objetivo){
        planes[i].style.opacity = '0.7';
      }
    }
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
      duration: 2000,
      position: position,
      icon: icono,
      cssClass: cssClass
    });

    await toast.present();
  }
  cambiarPlan(opcion:number){
    if(opcion !== this.objetivo){
      this.usuarioService.cambiarPlan(this.uid,opcion).subscribe({
        next: (res:any) =>{
          console.log(res);
          this.objetivo = res["usuario"]["objetivo"];
          this.cargarPlan();
          this.nuevaSuscripcion();
          this.mostrarToast('top',"Se ha cambiado el plan objetivo","exito","toast_exito");
        },
        error: (error) =>{
          console.log(error);
        }
      });
    }
  }
  cargarPlanes(){
    this.planService.obtenerPlanes().subscribe({
      next: async(res:any) =>{
        console.log(res);
        this.planes = res['plan'];
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
  nuevaSuscripcion(){
    const obj = {
      id_usuario: this.uid,
      id_plan: this.planes[this.objetivo]["uid"],
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      peso: this.peso,
    }
    this.suscripcionService.crearSuscripcion(obj).subscribe({
      next: async(res:any) =>{
        console.log(res);
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
}
