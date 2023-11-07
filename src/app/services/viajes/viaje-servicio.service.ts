import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';
import { AutenticacionStorageService } from '../autenticacion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ViajeServicioService {
  viajePath="/viajes"
  viajeCollection:AngularFirestoreCollection<Viaje>
  constructor(private fireStore:AngularFirestore, private authStorage:AutenticacionStorageService) {
    this.viajeCollection = fireStore.collection(this.viajePath)
  }

  async addViaje(viaje:Viaje)
  {
    return await this.viajeCollection.add(viaje)
  }

  async getViaje(usuario:Usuario)
  {
    return new Promise((resolve, reject) => {
      let viajes:Viaje[]
      this.viajeCollection.snapshotChanges().pipe(
        map(item=> 
          item.map(u=>
            ({id:u.payload.doc.id, ...u.payload.doc.data()}))
        )).subscribe(data=>{
          viajes=data
          viajes.forEach(item=>{
            if(item.conductor.email==usuario.email && item.estado==true)
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

  async getAllViajes():Promise<Viaje[]>
  {
    return new Promise((resolve, reject) => {
      let viajes:Viaje[]=[]
      this.viajeCollection.snapshotChanges().pipe(
        map(item=> 
          item.map(u=>
            ({id:u.payload.doc.id, ...u.payload.doc.data()}))
        )).subscribe(data=>{
          viajes=data
          resolve(viajes)
        })
      })
  }
  async cancelarViaje(usuario:Usuario)
  {
    return new Promise((resolve, reject) => {
      let viajes:Viaje[]
      let idViaje:any
      this.viajeCollection.snapshotChanges().pipe(
        map(item=> 
          item.map(u=>
            ({id:u.payload.doc.id, ...u.payload.doc.data()}))
        )).subscribe(data=>{
          idViaje = data[0].id
          viajes=data
          viajes.forEach(item=>{
            if(item.conductor.email==usuario.email)
            {
              item.estado=false
              this.viajeCollection.doc(idViaje).set(item)
              this.authStorage.getSesion().then(item2=>{
                if(item!==undefined)
                {
                  this.authStorage.iniciarSesion(item2.id,item2.usr,item2.aut,item)
                }
              })
              
              resolve(true)
            }
            resolve(false)
          })
          resolve(undefined)
        }, error=>{
          reject(error)
        })
      })
  }
  async aggPasajero(pasajero:Usuario, conductor:Usuario)
  {
    return new Promise((resolve, reject) => {
      let viajes:Viaje[]
      let idViaje:any
      let contador:number=0
      this.viajeCollection.snapshotChanges().pipe(
        map(item=> 
          item.map(u=>
            ({id:u.payload.doc.id, ...u.payload.doc.data()}))
        )).subscribe(data=>{
          idViaje = data[0].id
          data.forEach(item=>{
            if(item.conductor.email==conductor.email)
            {
              console.log(contador)
              contador += 1
              item.pasajeros.push(pasajero)
              this.viajeCollection.doc(item.id).set(item)
              this.authStorage.getSesion().then(item2=>{
                if(item!==undefined)
                {
                  this.authStorage.iniciarSesion(item2.id,item2.usr,item2.aut,item)
                  resolve(true)
                }
                resolve(false)
              })
              
              resolve(true)
            }
            resolve(false)
          })
          resolve(undefined)
        }, error=>{
          reject(error)
        })
      })
  }
}

