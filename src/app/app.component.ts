import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import { Usuario } from './interfaces/usuario';
import { AutenticacionFirebaseService } from './services/autenticacion-firebase.service';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { StoreFireService } from './services/store-fire.service';
import { AutenticacionStorageService } from './services/autenticacion-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  usuario:Usuario = {
    perfil:{nombre:""},
    email: "",
    password:"",
    patente:''
  }
  constructor(private storage:Storage, 
    private authFire:AutenticacionFirebaseService,
    private authStorage:AutenticacionStorageService,
    private toastController:ToastController,
    private router:Router) {}

  async ngOnInit() 
  {
    await this.storage.create();
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
