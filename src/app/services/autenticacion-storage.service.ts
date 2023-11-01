import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionStorageService {
  constructor(private storage:Storage) { }

  async getSesion()
  {
    let sesion:number =  await this.storage.get("sesion")
    return sesion
  }

  async iniciarSesion(usuario:Usuario)
  {
    await this.storage.set("sesion", usuario)
  }
}
