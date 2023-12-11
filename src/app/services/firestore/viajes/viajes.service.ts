import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auto } from 'src/app/interfaces/auto';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';


@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  
  pathViajes="/viajes"

  constructor(private fireStore:AngularFirestore) {

  }

  async addViaje(viaje:Viaje)
  {
    viaje.estado="EN CURSO"
    await this.fireStore.collection(this.pathViajes).doc(viaje.conductor.auto?.patente).set(viaje)
  }

  async addPasajero(viaje:Viaje)
  {
    if(viaje.conductor.auto !== undefined){
      viaje.conductor.auto.capacidad=viaje.conductor.auto.capacidad-1
    }
    
    await this.fireStore.collection(this.pathViajes).doc(viaje.conductor.auto?.patente).set(viaje)
  }

  async getAllViajes():Promise<Viaje[]>
  {
    return new Promise((resolve, reject)=>{
      let conductor:Usuario={
        email:"",
        nombre:"",
        password:""
      }
      let viajes:Viaje[]=[]

      this.fireStore.collection(this.pathViajes).get().subscribe((docs)=>{
        docs.forEach((item)=>{
          let viaje:Viaje={
          fecha_viaje:"",
          hora_salida:"",
          conductor:conductor,
          destino:"",
          costo:0,
          pasajeros:[]
          }
          let datos:any=item.data()
          let auto:Auto=datos['conductor']['auto']
          if(auto.capacidad>0){
            viaje.fecha_viaje=datos["fecha_viaje"]
            viaje.hora_salida=datos['hora_salida']
            viaje.destino=datos['destino']
            viaje.conductor=datos["conductor"]
            viaje.pasajeros=datos["pasajeros"]
            viaje.estado=datos["estado"]
            viajes.push(viaje)
          }
        })
      resolve(viajes)
      })
    })
  }

  async eliminarPasajero(viaje:Viaje)
  {
    if(viaje.conductor.auto!==undefined)
    {
      viaje.conductor.auto.capacidad+=1
      return await this.fireStore.collection(this.pathViajes).doc(viaje.conductor.auto.patente).set(viaje)
    }
  }

  async anularViaje(viaje:Viaje)
  {
    let cantidad:number=0
    console.log(viaje)
    if(viaje.conductor.auto!==undefined && viaje.pasajeros!==undefined)
    {
      viaje.pasajeros.forEach(()=>{
        cantidad+=1
      })
      viaje.conductor.auto.capacidad+=cantidad
      console.log(viaje.conductor.auto.capacidad)
      return await this.fireStore.collection(this.pathViajes).doc(viaje.conductor.auto.patente).delete()
    }
  }
  async obtenerViaje(usuario:Usuario):Promise<Viaje|undefined>
  {
    return new Promise((resolve, reject)=>{
      let viaje:Viaje
      this.fireStore.collection(this.pathViajes).doc(usuario.auto?.patente).get().subscribe((doc:any)=>{
        if(doc!==null)
        {
          let data = doc.data()
          viaje=data
          resolve(viaje)
        }
        resolve(undefined)
      })
    })
  }
}
