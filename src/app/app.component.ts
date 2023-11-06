import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import { Usuario } from './interfaces/usuario';
import { AutenticacionFirebaseService } from './services/autenticacion-firebase.service';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { StoreFireService } from './services/store-fire.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  usuario:Usuario = {
    perfil:{nombre:""},
    email: "",
    password:""
  }
  constructor(private storage:Storage, 
    private authFire:AutenticacionFirebaseService, 
    private toastController:ToastController,
    private router:Router) {}

  async ngOnInit() 
  {
    await this.storage.create();
    let sesion = await this.storage.get("sesion")
    if(sesion)
    {
      this.usuario.email = sesion.email
      this.usuario.password = sesion.password
      this.usuario.perfil.nombre=sesion.perfil.nombre
      const user = await this.authFire.iniciarSesion(this.usuario).catch((error)=> {
        if(error.code==="auth/invalid-login-credentials")
        {
          this.presentToast("Error al intentar iniciar sesion")
          this.router.navigate(["/login"])
        }
        if(error.code==="auth/network-request-failed")
        {
          this.presentToast("Error de conexion. . .")
          this.router.navigate(["/no-conexion"]) // pagina sin conexion hay que crearla
        }
      })
      if(user)
      {
        let extras:NavigationExtras = {
          state:
          {
            datos: this.usuario
          }
        }
        this.router.navigate(["/tabs/home"], extras)
      }
    }
  }

  async presentToast(mensaje:string)
  {
    let toast = await this.toastController.create({
      message:mensaje,
      duration:1500,
      position:"top"
    })

    await toast.present()
  }
}
