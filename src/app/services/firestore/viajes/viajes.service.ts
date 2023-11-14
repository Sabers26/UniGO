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
    viaje.pasajeros=[]
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
            viaje.costo=datos["costo"]
            viajes.push(viaje)
          }
        })
      resolve(viajes)
      })
    })
  }

  async buscarViajePasajero(usuario:Usuario):Promise<Viaje|undefined>
  {
    return new Promise((resolve, reject)=>{
      let conductor:Usuario={
        email:"",
        nombre:"",
        password:"",
      }
      let viaje:Viaje={
        fecha_viaje:"",
          hora_salida:"",
          conductor:conductor,
          destino:"",
          costo:0,
          pasajeros:[]
      }
      this.fireStore.collection(this.pathViajes).get().subscribe((docs)=>{
      docs.forEach((viajes)=>{
        let datos:any=viajes.data()
        let pasajeros:Usuario[] = datos["pasajeros"]
        pasajeros.forEach((pasajero)=>{
          console.log(pasajero)
          if(usuario.email==pasajero.email)
          {
            console.log("pase el if")
            viaje.fecha_viaje=datos["fecha_viaje"]
            viaje.hora_salida=datos['hora_salida']
            viaje.destino=datos['destino']
            viaje.conductor=datos["conductor"]
            viaje.pasajeros=datos["pasajeros"]
            viaje.estado=datos["estado"]
            viaje.costo=datos["costo"]
            console.log("Soy el viaje del fire " + viaje)
            resolve(viaje)
          }
        })
        resolve(undefined)
      })
    })
    })
  }
  async eliminarPasajero(viaje:Viaje)
  {
    if(viaje.conductor.auto!==undefined)
    {
      viaje.conductor.auto.capacidad+=1
      await this.fireStore.collection(this.pathViajes).doc(viaje.conductor.auto.patente).set(viaje)
    }
  }

  async anularViaje(viaje:Viaje)
  {
    let cantidad:number=0
    if(viaje.conductor.auto!==undefined && viaje.pasajeros!==undefined)
    {
      viaje.pasajeros.forEach(()=>{
        cantidad+=1
      })
      viaje.conductor.auto.capacidad+=cantidad
      await this.fireStore.collection(this.pathViajes).doc(viaje.conductor.auto.patente).delete()
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
