import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  path = '/usuarios'

  constructor(private authStore: AngularFirestore) { }

  async addUsuario(usuario: Usuario) {
    usuario.password = ''
    await this.authStore.collection(this.path).doc(usuario.email).set(usuario)
  }

  async obtenerUsuario(usuario: Usuario): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      this.authStore.collection(this.path).doc(usuario.email).get().subscribe((doc: any) => {
        if (doc !== undefined) {
          let datos = doc.data()
          usuario.nombre = datos["nombre"]
          if(datos["auto"]!==undefined)
          {
            usuario.auto=datos["auto"]
          }
          resolve(usuario)
        }
        else {
          reject("No se encontro el usuario")
        }
      })
    })
  }

  async addAuto(usuario:Usuario)
  {
    usuario.password=""
    this.authStore.collection(this.path).doc(usuario.email).set(usuario)
  }
  async getAuto(usuario:Usuario):Promise<Usuario>
  {
    return new Promise((resolve, reject) => {
      this.authStore.collection(this.path).doc(usuario.email).get().subscribe((doc:any)=>{
      if(doc!==undefined)
      {
        let datos = doc.data()
        usuario.auto=datos["auto"]
        resolve(usuario)
      }
      reject("No se encontro auto asociado al usuario")
    })})
  }

  updateUser(usuario:Usuario, newData: any): Promise<void> {
    const userRef = this.authStore.collection(this.path).doc(usuario.email);

    return userRef.update(newData);
  }

}
