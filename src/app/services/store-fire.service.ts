import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class StoreFireService {

  usuarioPath="/usuarios"
  collectionUsuario: AngularFirestoreCollection<Usuario>

  constructor(private fireStore:AngularFirestore) 
  { 
    this.collectionUsuario = fireStore.collection(this.usuarioPath);
  }

  async addUsuario(usuario:Usuario)
  {
    usuario.password=""
    return await this.collectionUsuario.add(usuario)
  }

  async getUsuario(usuario:Usuario)
  {
    console.log(this.collectionUsuario.doc())
  }
}
