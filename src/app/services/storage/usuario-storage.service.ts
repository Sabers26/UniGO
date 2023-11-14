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
    this.storage.remove("conexion")
    this.storage.remove("viaje")
  }

  async addViajeLocal(viaje:Viaje)
  {
    console.log(viaje)
    await this.storage.set("viaje", viaje)
  }

  async getViajeLocal():Promise<Viaje>
  {
    return await this.storage.get("viaje")
  }

  async eliminarPasajero(viaje:Viaje)
  {
    await this.storage.set("viaje", viaje)
  }

  async anularViaje()
  {
    await this.storage.remove("viaje")
  }

  async addConexion(id:number)
  {
    return await this.storage.set("conexion", id)
  }

  async getConexion():Promise<number>
  {
    return await this.storage.get("conexion")
  }
}
