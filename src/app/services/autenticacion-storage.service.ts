import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../interfaces/usuario';
import { Sesion } from '../interfaces/sesion';
import { Auto } from '../interfaces/auto';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionStorageService {
  usuario:Usuario={
    email:'',
    password:'',
    perfil:{nombre:''},
    patente:''
  }
  auto:Auto={
    patente:'',
    modelo:'',
    color:'',
    capacidad:0,
    conductor:''
  }
  sesion:Sesion={
    id:0,
    usr:this.usuario,
    aut:this.auto
  }
  constructor(private storage:Storage) { }

  async getSesion():Promise<Sesion>
  {
    return new Promise((resolve, reject)=>{
      this.storage.get("sesion").then(item=>{
        this.sesion.id=item[0]
        this.sesion.usr=item[1]
        this.sesion.aut=item[2]
        resolve(this.sesion)
      }, error=>{
        reject(error)
      })
    })
    
  }

  async iniciarSesion(id:number, usuario:Usuario, auto:Auto)
  {
    await this.storage.set("sesion", [id,usuario, auto])
  }
}
