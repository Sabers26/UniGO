import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces/usuario';

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
}
