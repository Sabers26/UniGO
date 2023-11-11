import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';

@Injectable({
  providedIn: 'root'
})
export class UsuarioStorageService {

  constructor(private storage:Storage) { }

  async login(usuario:Usuario)
  {
    this.storage.set("sesion", usuario)
  }

  async getSesion():Promise<Usuario>
  {
    return this.storage.get("sesion")
  }
  async logOut()
  {
    this.storage.remove("sesion")
  }

  async addViajeLocal(viaje:Viaje)
  {
    await this.storage.set("viaje", viaje)
  }
}
