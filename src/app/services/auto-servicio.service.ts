import { Injectable } from '@angular/core';
import { Auto } from '../interfaces/auto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from '../interfaces/usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoServicioService {
  auto:Auto={
    patente:'',
    modelo:'',
    color:'',
    capacidad:0,
    conductor:"",
  }
  autoPath="/auto"
  collectionAuto: AngularFirestoreCollection<Auto>
  constructor(private fireStore:AngularFirestore) {
    this.collectionAuto = fireStore.collection(this.autoPath)
  }

  async addAuto(auto:Auto)
  {
    return await this.collectionAuto.add(auto)
  }
  
  async getAuto(usuario:Usuario):Promise<any>
  {
    return new Promise((resolve, reject) =>{
      let autos:Auto[]=[]
      this.collectionAuto.snapshotChanges().pipe(
        map(item=> 
          item.map(u=>
            ({id:u.payload.doc.id, ...u.payload.doc.data()}))
        )).subscribe(data=>{
          autos=data
          autos.forEach(item=>{
            if(item.conductor==usuario.email)
            {
              resolve(item)
            }
          })
          resolve(undefined)
        }, error=>{
          reject(error)
        })
      })
  }
}
