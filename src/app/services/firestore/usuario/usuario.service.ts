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
          resolve(usuario)
        }
        else {
          reject("No se encontro el usuario")
        }
      })
    })
  }
}
