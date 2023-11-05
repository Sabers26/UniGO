import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from '../interfaces/usuario';
import { map } from 'rxjs/operators';
import { Subscriber } from 'rxjs';

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

  async getUsuario(usuario:Usuario):Promise<string>
  {
    return new Promise((resolve,reject) =>{
      let usr:Usuario[]
      let nombre:string=''
    this.collectionUsuario.snapshotChanges().pipe( 
      map(item=> 
        item.map(u=>
          ({id:u.payload.doc.id, ...u.payload.doc.data()}))
      )).subscribe(data=>{
        usr=data
        usr.forEach(item=>{
          nombre = item.perfil.nombre
          resolve(nombre)
        })
      }, error=>{
        reject(error)
      })
    })
  }
}

/* usr.forEach(u=>{
  if(u.email==usuario.email)
  {
    console.log(u.perfil.nombre)
    return nombre
  }
}) */

/*this.collectionUsuario.snapshotChanges().pipe( 
      map(item=> 
        item.map(u=>
          ({id:u.payload.doc.id, ...u.payload.doc.data()}))
      )).subscribe(item=>{
        usr=item
      })*/ 